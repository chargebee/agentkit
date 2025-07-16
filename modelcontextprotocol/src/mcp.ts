import crypto from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MCP_SERVER_NAME, VERSION } from './constants.js';
import { tools } from './tools/index.js';
import { getUserAgent } from './utils/platform.js';
import { chargebeeAIClient } from './chargebee-ai-client/index.js';

/**
 * A server implementation for the Model Context Protocol (MCP) specific to Chargebee.
 * Extends the base McpServer class with Chargebee-specific tools functionality.
 * @extends McpServer
 */
export class ChargebeeMCPServer extends McpServer {
	constructor() {
		super({
			name: MCP_SERVER_NAME,
			version: VERSION,
		});

		this.registerTools();
		this.registerPrompts();

		this.server.oninitialized = () => {
			const mcpClient = this.server.getClientVersion();
			const userAgent = getUserAgent({
				mcpClientName: mcpClient?.name,
				mcpClientVersion: mcpClient?.version,
			});

			chargebeeAIClient.attachHeaders({
				'User-Agent': userAgent,
				'x-mcp-session-id': crypto.randomUUID(),
			});
		};
	}

	/**
	 * Registers all available tools with the MCP server.
	 * Each tool is registered with its method, description, parameter shape, and execution handler.
	 * The execution results are formatted as text content in the MCP protocol format.
	 * @private
	 */
	private registerTools() {
		tools.forEach((tool) => {
			this.tool(
				tool.method,
				tool.description,
				tool.parameters.shape,
				async (arg: any) => {
					try {
						const result = await tool.execute(arg, this);

						return {
							content: [
								{
									type: 'text' as const,
									text: JSON.stringify(result, null, 2),
								},
							],
						};
					} catch (error) {
						return {
							content: [
								{
									type: 'text' as const,
									text: `Error: ${error instanceof Error ? error.message : String(error)}`,
								},
							],
							isError: true,
						};
					}
				},
			);
		});
	}

	/**
	 * Registers system prompts to guide tool selection.
	 * @private
	 */
	private registerPrompts() {
		this.prompt(
			'chargebee-tool-selection',
			'Guidelines for choosing the right Chargebee tool based on query type',
			{},
			async () => {
				return {
					messages: [
						{
							role: 'user' as const,
							content: {
								type: 'text' as const,
								text: `When working with Chargebee queries, choose the appropriate tool based on the question type:

**Use chargebee_code_planner when:**
- User asks "how to..." questions (e.g., "how to update billing address", "how to create subscription")
- User needs implementation guidance or code examples
- User wants to integrate specific Chargebee functionality
- User asks about API usage, webhooks, or technical implementation
- User needs code generation documentation or API documentation involved in code creation

**Use chargebee_documentation_search when:**
- User asks about product features and concepts (e.g., "what billing models does Chargebee support")
- User wants to understand business processes or workflows
- User needs general product information or explanations
- User asks about pricing, plans, or business-related features

**Decision rule:** If the query involves implementation, code generation, or API documentation ("how to do X"), use code_planner. If it's about understanding product concepts ("what is X"), use documentation_search.`,
							},
						},
					],
				};
			},
		);
	}
}
