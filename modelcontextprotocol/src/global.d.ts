declare global {
	var AGENTKIT_BASE_URL: string;

	namespace NodeJS {
		interface ProcessEnv {
			CHARGEBEE_TELEMETRY_DISABLED?: string;
			AGENTKIT_BASE_URL?: string;
		}
	}
}

export {};
