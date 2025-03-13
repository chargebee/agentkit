import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
	ChargebeeAIClient,
	chargebeeAIClient,
} from './chargebee-ai-client/index.js';
import { MCP_SERVER_NAME, VERSION } from './constants.js';
import { tools } from './tools/index.js';
import { logger } from './utils/log.js';
import { telemetryService } from './utils/telemetry.js';

/**
 * A server implementation for the Model Context Protocol (MCP) specific to Chargebee.
 * Extends the base McpServer class with Chargebee-specific tools functionality.
 * @extends McpServer
 */
export class ChargebeeMCPServer extends McpServer {
	public chargebeeAIClient: ChargebeeAIClient;

	constructor() {
		super({
			name: MCP_SERVER_NAME,
			version: VERSION,
		});

		this.chargebeeAIClient = chargebeeAIClient;

		const mcpClientDetails = this.server.getClientVersion();

		this.registerTools();

		// Track server initialization
		telemetryService.trackEvent('server_initialized', {
			clientName: mcpClientDetails?.name,
			clientVersion: mcpClientDetails?.version,
		});
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
					const startTime = Date.now();
					let success = false;

					try {
						logger.info('Received tool call:', tool.name);

						// Track tool call start
						await telemetryService.trackEvent('tool_call_start', {
							tool: tool.name,
							method: tool.method,
						});

						const result = await tool.execute(arg, this);
						success = true;

						// Track tool call success
						await telemetryService.trackEvent('tool_call_success', {
							tool: tool.name,
							method: tool.method,
							duration: Date.now() - startTime,
						});

						return {
							content: [
								{
									type: 'text' as const,
									text: JSON.stringify(result, null, 2),
								},
							],
						};
					} catch (error) {
						logger.error(`Error executing tool: ${tool.name}`, error);

						// Track tool call error
						await telemetryService.trackEvent('tool_call_error', {
							tool: tool.name,
							method: tool.method,
							error: error instanceof Error ? error.message : String(error),
							duration: Date.now() - startTime,
						});

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
