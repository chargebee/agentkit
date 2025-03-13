import {
	ClientConfig,
	DocumentationSearchParams,
	DocumentationSearchResponse,
	Method,
	RequestOptions,
	TelemetryData,
} from './types.js';
import { logger } from '@/utils/log.js';

export class ChargebeeAIClient {
	private readonly clientConfig: ClientConfig;
	private headers: Record<string, any> = {};
	private static instance: ChargebeeAIClient | null = null;

	/**
	 * Gets or creates a singleton instance of ChargebeeAIClient
	 * @param clientConfig - Configuration options for the client
	 * @returns The singleton instance of ChargebeeAIClient
	 */
	public static getInstance(
		clientConfig: ClientConfig = { baseUrl: BASE_URL },
	): ChargebeeAIClient {
		if (!ChargebeeAIClient.instance) {
			ChargebeeAIClient.instance = new ChargebeeAIClient(clientConfig);
		}
		return ChargebeeAIClient.instance;
	}

	private constructor(clientConfig: ClientConfig) {
		this.clientConfig = clientConfig;
		this.attachHeaders(clientConfig.headers || {});
	}

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
				endpoint: '/v1/docs/search',
				method: 'POST',
				body: JSON.stringify({
					...params,
					format: 'markdown', // INFO: For this MCP tool, we only provide markdown format.
				}),
				...options,
			});
			return response.results;
		};

	/**
	 * Send telemetry data to the telemetry endpoint
	 * @param data - The telemetry data to send
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

	// Example of how to add new methods:
	// public someNewMethod: Method<SomeRequestType, SomeResponseType> = async (params, options = {}) => {
	//   const response = await this.request<SomeResponseType>({
	//     endpoint: '/some/endpoint',
	//     method: 'POST',
	//     body: JSON.stringify(params),
	//     ...options
	//   });
	//   return response;
	// }
}

export const chargebeeAIClient = ChargebeeAIClient.getInstance();
