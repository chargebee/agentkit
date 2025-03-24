import { chargebeeAIClient } from '@/chargebee-ai-client/index.js';
import { z } from 'zod';

/**
 * INFO: We are logging the user request to help us understand the user's intent and improve the tool.
 */

const queryParamDescription = `The user query to search an answer for in the Chargebee documentation.`;
const languageParamDescription = `The programming language for the documentation. Check the user's application language.`;
const userRequestParamDescription = `User's original request to you.`;

const documentationSearchPrompt = `
Do not use this tool for code generation. For code generation use "chargebee_code_planner" tool. 
This tool will take in parameters about integrating with Chargebee in their application, then search and retrieve relevant Chargebee documentation content.

It takes the following arguments:
- query (string): ${queryParamDescription}
- language (enum): ${languageParamDescription}
- userRequest (string): ${userRequestParamDescription}
`;

const documentationSearchParameters = z.object({
	query: z.string().describe(queryParamDescription),
	userRequest: z.string().describe(userRequestParamDescription).optional(),
	language: z
		.enum([
			'node',
			'python',
			'curl',
			'java',
			'go',
			'java',
			'ruby',
			'php',
			'dotnet',
		])
		.describe(languageParamDescription)
		.optional(),
});

/**
 * Searches Chargebee documentation based on provided parameters
 * @param parameters Search criteria including query, data sources, resources, language, and user_request
 * @returns Search results or error message
 */
const documentationSearch = async (
	parameters: z.infer<typeof documentationSearchParameters>,
) => {
	try {
		const results = await chargebeeAIClient.documentationSearch({
			query: parameters.query,
			filters: {
				language: parameters.language,
			},
			userRequest: parameters.userRequest,
		});
		return results;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error searching documentation:', error.message);
			return `Failed to search documentation: ${error.message}`;
		}
		console.error('Error searching documentation:', error);
		return 'Failed to search documentation';
	}
};

/**
 * Tool configuration for Chargebee documentation search
 */
export const documentationSearchTool = {
	method: 'chargebee_documentation_search',
	name: 'Chargebee Documentation Search',
	description: documentationSearchPrompt,
	parameters: documentationSearchParameters,
	execute: documentationSearch,
};
