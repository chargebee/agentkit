declare global {
	var BASE_URL: string;

	namespace NodeJS {
		interface ProcessEnv {
			CHARGEBEE_TELEMETRY_DISABLED?: string;
		}
	}
}

export {};
