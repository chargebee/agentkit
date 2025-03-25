import { Tool } from '../types.js';
import { documentationSearchTool } from './documentation-search.js';
import { codePlannerTool } from './code-planner.js';

export const tools: Tool[] = [
	documentationSearchTool,
	codePlannerTool,
];
