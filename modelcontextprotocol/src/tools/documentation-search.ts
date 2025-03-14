import { chargebeeAIClient } from '@/chargebee-ai-client/index.js';
import { z } from 'zod';

/**
 * INFO: We are logging the user request to help us understand the user's intent and improve the tool.
 */

const queryParamDescription = `The user query to search an answer for in the Chargebee documentation.`;
const languageParamDescription = `The programming language for the documentation. Check the user's application language.`;
const resourceParamDescription = `The Chargebee resources to search documentation for.`;
const dataSourceParamDescription = `The type of documentation source to search in (help documentation, API documentation, or release notes).`;
const userRequestParamDescription = `User's original request to you.`;

const documentationSearchPrompt = `
This tool will take in parameters about integrating with Chargebee in their application, then search and retrieve relevant Chargebee documentation content.

It takes the following arguments:
- query (string): ${queryParamDescription}
- user_request (string): ${userRequestParamDescription}
- data_sources (array of enum): ${dataSourceParamDescription}
- resources (array of enum): ${resourceParamDescription}
- language (enum): ${languageParamDescription}
`;

const documentationSearchParameters = z.object({
	query: z.string().describe(queryParamDescription),
	user_request: z.string().describe(userRequestParamDescription).optional(),
	data_sources: z
		.array(z.enum(['help_documentation', 'api_documentation', 'release_notes']))
		.describe(dataSourceParamDescription)
		.optional(),
	resources: z
		.array(
			z
				.enum([
					'address',
					'attached_item',
					'business_entity_change',
					'card',
					'comment',
					'configuration',
					'coupon',
					'coupon_code',
					'coupon_set',
					'credit_note',
					'currency',
					'customer',
					'customer_entitlement',
					'differential_price',
					'entitlement',
					'entitlement_override',
					'estimate',
					'event',
					'export',
					'feature',
					'full_export',
					'gift',
					'hosted_page',
					'in_app_subscription',
					'installment',
					'installment_config',
					'invoice',
					'item',
					'item_entitlement',
					'item_family',
					'item_price',
					'non_subscription',
					'omnichannel_subscription',
					'omnichannel_subscription_item',
					'order',
					'payment_intent',
					'payment_schedule_scheme',
					'payment_source',
					'payment_voucher',
					'portal_session',
					'price_variant',
					'pricing_page_session',
					'product',
					'promotional_credit',
					'purchase',
					'quote',
					'ramp',
					'recorded_purchase',
					'report',
					'site_migration_detail',
					'subscription',
					'subscription_entitlement',
					'time_machine',
					'transaction',
					'unbilled_charge',
					'usage',
					'usage_event',
					'variant',
					'virtual_bank_account',
				])
				.describe(resourceParamDescription),
		)
		.describe('List of possible resources to search documentation for.')
		.optional(),
	language: z
		.enum([
			'nodejs',
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
				resources: parameters.resources,
				data_sources: parameters.data_sources,
			},
			user_request: parameters.user_request,
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
