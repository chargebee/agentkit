export interface DocumentationSearchResponse {
	results: string[];
}

export interface DocumentationSearchParams {
	query: string;
	limit?: number;
	filters?: {
		language?: string;
		resources?: string[];
		data_sources?: (
			| 'help_documentation'
			| 'api_documentation'
			| 'release_notes'
		)[];
	};
	user_request?: string;
}

export interface RequestOptions extends RequestInit {
	endpoint: string;
}

export interface ClientConfig {
	baseUrl: string;
	headers?: Record<string, string>;
}

export type Method<TRequest, TResponse> = (
	params: TRequest,
	options?: Partial<RequestOptions>,
) => Promise<TResponse>;
