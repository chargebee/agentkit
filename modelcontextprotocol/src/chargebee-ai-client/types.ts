export interface DocumentationSearchResponse {
	results: {
		content: string;
    url: string;
	}[]
}

export interface DocumentationSearchParams {
	query: string;
	limit?: number;
	filters?: {
		language?: string;
	};
	userRequest?: string;
}

export interface CodePlannerParams {
	query: string;
	language?: string;
}

export interface CodePlannerResponse {
	result: {
		content: string;
  };
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
