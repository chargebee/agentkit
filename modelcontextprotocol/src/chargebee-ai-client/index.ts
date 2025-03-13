import {
	ClientConfig,
	DocumentationSearchParams,
	DocumentationSearchResponse,
	Method,
	RequestOptions,
	TelemetryData,
} from './types.js';
import { logger } from '@/utils/log.js';

/**
 * Client for interacting with the Chargebee AI API
 * Provides methods for documentation search and telemetry reporting
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
	public documentationSearch: Method<DocumentationSearchParams, string[]> =
		async (params: DocumentationSearchParams, options = {}) => {
			const response = await this.request<DocumentationSearchResponse>({
				endpoint: '/v1/documentation/search',
				method: 'POST',
				body: JSON.stringify({
					...params,
				}),
				...options,
			});
			return response.results;
		};

	/**
	 * Send telemetry data to the telemetry endpoint
	 * @param data - The telemetry data to send
	 * @param options - Optional request configuration
	 * @returns A promise that resolves when the telemetry is sent
	 */
	public sendTelemetry: Method<TelemetryData, void> = async (
		data: TelemetryData,
		options = {},
	) => {
		try {
			await this.request<void>({
				endpoint: '/v1/telemetry',
				method: 'POST',
				body: JSON.stringify(data),
				...options,
			});
		} catch (error) {
			// Silently fail telemetry errors to not disrupt the main application flow
			logger.debug(
				`Telemetry error: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	};
}

export const chargebeeAIClient = new ChargebeeAIClient({
	baseUrl: AGENTKIT_BASE_URL,
});