import { VERSION } from '@/constants.js';
import os from 'os';

interface UserAgentParams {
	mcpClientName?: string;
	mcpClientVersion?: string;
}

/**
 * Generates a User-Agent string
 * @param {Object} params - Configuration parameters
 * @param {string} params.mcpClientName - Name of the MCP client
 * @param {string} params.mcpClientVersion - Version of the MCP client
 * @returns {string} Formatted User-Agent string
 */
export function getUserAgent({
	mcpClientName = 'unknown',
	mcpClientVersion = 'unknown',
}: UserAgentParams) {
	return `ChargebeeMCP/${VERSION} (${os.platform()}; Node/${process.version}; ${mcpClientName}/${mcpClientVersion})`;
}
