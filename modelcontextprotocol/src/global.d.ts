declare global {
	var AGENTKIT_BASE_URL: string;

	namespace NodeJS {
		interface ProcessEnv {
			AGENTKIT_BASE_URL?: string;
		}
	}
}

export {};
