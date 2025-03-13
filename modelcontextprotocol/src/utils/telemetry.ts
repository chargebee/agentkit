import { chargebeeAIClient } from '@/chargebee-ai-client/index.js';
import { TelemetryData } from '@/chargebee-ai-client/types.js';
import { config } from '@/config.js';
import { logger } from './log.js';
import { getPlatformInfo } from './platform.js';

/**
 * Telemetry service for tracking usage and events
 */
class TelemetryService {
	private isEnabled: boolean;
	private sessionStartTime: number;

	constructor() {
		this.sessionStartTime = Date.now();
		this.isEnabled = !config.telemetry.disabled;

		if (this.isEnabled) {
			// Get the telemetry endpoint from config or use a default
			logger.debug(`Telemetry initialized`);
		} else {
			logger.info('Telemetry is disabled');
		}
	}

	/**
	 * Track an event with the telemetry service
	 * @param eventName - The name of the event to track
	 * @param properties - Additional properties to include with the event
	 */
	public async trackEvent(
		eventName: string,
		properties: Record<string, any> = {},
	): Promise<void> {
		if (!this.isEnabled) {
			return;
		}

		try {
			const eventData: TelemetryData = {
				event: eventName,
				timestamp: new Date().toISOString(),
				version: config.version,
				platform: getPlatformInfo(),
				sessionDuration: Date.now() - this.sessionStartTime,
				...properties,
			};

			await this.sendTelemetry(eventData);
		} catch (error) {
			// Silently fail telemetry errors to not disrupt the main application flow
			logger.debug(
				`Telemetry error: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	/**
	 * Send telemetry data to the endpoint
	 * @param data - The data to send
	 */
	private async sendTelemetry(data: TelemetryData): Promise<void> {
		try {
			await chargebeeAIClient.sendTelemetry(data);
		} catch (error) {
			// Log but don't throw to prevent disrupting the main application flow
			logger.debug(
				`Failed to send telemetry: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}
}

export const telemetryService = new TelemetryService();
