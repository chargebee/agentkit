import { chargebeeAIClient } from '@/chargebee-ai-client/index.js';
import { z } from 'zod';

/**
 * INFO: We are logging the user request to help us understand the user's intent and improve the tool.
 */

const goalParamDescription = `What is the user's goal?`;
const languageParamDescription = `Programming language the code to be generated in. Check the user's application language.`;
const codePlannerPrompt = `
Always use this tool to get the accurate integeration code guide for Chargebee.
This tool will take in parameters about integrating with Chargebee in their application and generates a integration workflow along with the code snippets.

It takes the following arguments:
- goal (string): ${goalParamDescription}
- language (enum): ${languageParamDescription}
`;

const codePlannerParameters = z.object({
	goal: z.string().describe(goalParamDescription),
	language: z
		.enum([
			'node',
			'python',
			'curl',
			'java',
			'go',
			'ruby',
			'php',
			'dotnet',
		])
		.describe(languageParamDescription)
		.optional(),
});

/**
 * Generates a code planner based on provided parameters
 * @param parameters Parameters for the code planner
 * @returns Code planner or error message
 */
const generateCodePlanner = async (
	parameters: z.infer<typeof codePlannerParameters>,
) => {
	try {
		const results = await chargebeeAIClient.getCodePlanner({
			query: parameters.goal,
			language: parameters.language,
		});
		return results;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error generating code planner:', error.message);
			return `Failed to generate code planner: ${error.message}`;
		}
		console.error('Error generating code planner:', error);
		return 'Failed to generate code planner';
	}
};

/**
 * Tool configuration for Chargebee Code Planner
 */
export const codePlannerTool = {
	method: 'chargebee_code_planner',
	name: 'Chargebee Code Planner',
	description: codePlannerPrompt,
	parameters: codePlannerParameters,
	execute: generateCodePlanner,
};
