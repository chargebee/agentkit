import {
	ClientConfig,
	CodePlannerParams,
	CodePlannerResponse,
	DocumentationSearchParams,
	DocumentationSearchResponse,
	Method,
	RequestOptions,
} from './types.js';

/**
 * Client for interacting with the Chargebee AI API
 */
export class ChargebeeAIClient {
	private readonly clientConfig: ClientConfig;
	private headers: Record<string, any> = {};

	/**
	 * Creates a new instance of the ChargebeeAIClient
	 * @param clientConfig - Configuration options for the client including baseUrl and optional headers
	 */
	constructor(clientConfig: ClientConfig) {
		this.clientConfig = clientConfig;
		this.attachHeaders(clientConfig.headers || {});
	}

	/**
	 * Makes an HTTP request to the Chargebee AI API
	 * @param options - Request configuration including endpoint, method, and optional body and headers
	 * @returns Promise resolving to the parsed JSON response
	 * @throws Error if the request fails or returns a non-OK status
	 */
	private async request<T>(options: RequestOptions): Promise<T> {
		const url = `${this.clientConfig.baseUrl}${options.endpoint}`;
		try {
			const response = await fetch(url, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'fetch',
					'X-CB-Consumer-App-Name': 'mcp',
					...this.headers,
					...options.headers,
				},
			});

			if (!response.ok) {
				throw new Error(`API error: ${response.status} ${response.statusText}`);
			}

			return response.json();
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Request failed: ${error.message}`);
			}
			throw new Error('Request failed with unknown error');
		}
	}

	/**
	 * Attaches additional metadata headers to be included in all requests
	 * @param headers - Key-value pairs of headers to attach
	 */
	public attachHeaders(headers: Record<string, any>) {
		Object.entries(headers).forEach(([key, value]) => {
			this.headers[key] = value;
		});
	}

	/**
	 * Searches the documentation using the provided parameters
	 * @param params - Search parameters for the documentation
	 * @param options - Optional request configuration
	 * @returns Promise resolving to an array of search results in markdown format
	 */
	public documentationSearch: Method<DocumentationSearchParams, DocumentationSearchResponse['results']> =
		async (params: DocumentationSearchParams) => {
			const response = await this.request<DocumentationSearchResponse>({
				endpoint: '/documentation_search',
				method: 'POST',
				body: JSON.stringify({
					...params,
				}),
			});
			return response.results;
		};

	/**
	 * Generates a code planner using the provided parameters
	 * @param params - Parameters for the code planner
	 * @param options - Optional request configuration
	 * @returns String containing the code planner
	 */
	public getCodePlanner: Method<CodePlannerParams, CodePlannerResponse['result']['content']> = async (
		params: CodePlannerParams,
	) => {
		const response = await this.request<CodePlannerResponse>({
			endpoint: '/code_planner',
			method: 'POST',
			body: JSON.stringify({
				...params,
				query: params.query,
        stream: false
			}),
		});
		return response.result.content;
	};
}

export const chargebeeAIClient = new ChargebeeAIClient({
	baseUrl: process.env.AGENTKIT_BASE_URL!,
});
