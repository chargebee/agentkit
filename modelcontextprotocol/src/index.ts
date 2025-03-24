#!/usr/bin/env node

import { logger } from '@/utils/log.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Command } from 'commander';
import { VERSION } from './constants.js';
import { ChargebeeMCPServer } from './mcp.js';

/**
 * Main entry point for the Chargebee MCP server
 * Initializes CLI and starts the server
 */
async function main() {
	const program = new Command();

	program
		.name('chargebee-mcp')
		.description('MCP server for interacting with Chargebee')
		.version(VERSION)
		.action(async () => {
			try {
				const mcpServer = new ChargebeeMCPServer();
				const transport = new StdioServerTransport();

				await mcpServer.connect(transport);
				logger.info('Chargebee MCP server is running on stdio... 🚀');

				// Handle process signals
				const cleanup = async () => {
					if (mcpServer) {
						logger.info('Shutting down Chargebee MCP server...');

						await mcpServer.close();
						process.exit(0);
					}
				};

				process.on('SIGINT', cleanup);
				process.on('SIGTERM', cleanup);

				// Keep the process running
				await new Promise(() => {});
			} catch (error) {
				logger.error('Error starting Chargebee MCP server:', error);
				process.exit(1);
			}
		});

	await program.parseAsync(process.argv);
}

/**
 * Handles initialization errors and exits the process
 * @param error - The error that occurred during initialization
 */
function handleError(error: any) {
	logger.error('\n🚨  Error initializing Aero AI MCP server:\n');
	logger.warn(`   ${error.message}\n`);
	process.exit(1);
}

main().catch((error) => {
	handleError(error);
});
