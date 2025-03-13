import { z } from 'zod';
import { ChargebeeMCPServer } from './mcp.js';

export type Tool = {
	method: string;
	name: string;
	description: string;
	parameters: z.ZodObject<any, any, any, any>;
	execute: (parameters: any, context: ChargebeeMCPServer) => Promise<any>;
};
