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
}
