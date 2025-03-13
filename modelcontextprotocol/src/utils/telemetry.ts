import crypto from 'crypto';
import { logger } from './log.js';
import { config } from '@/config.js';
import { getPlatformInfo } from './platform.js';
import {
	chargebeeAIClient,
	ChargebeeAIClient,
} from '@/chargebee-ai-client/index.js';
import { TelemetryData } from '@/chargebee-ai-client/types.js';

/**
 * Telemetry service for tracking usage and events
 */
class TelemetryService {
	private static instance: TelemetryService;
	private sessionId: string;
	private isEnabled: boolean;
	private sessionStartTime: number;
	public chargebeeAIClient: ChargebeeAIClient;

	private constructor({
		chargebeeAIClient,
	}: {
		chargebeeAIClient: ChargebeeAIClient;
	}) {
		this.sessionId = crypto.randomUUID();
		this.sessionStartTime = Date.now();
		this.isEnabled = !config.telemetry.disabled;
		this.chargebeeAIClient = chargebeeAIClient;

		if (this.isEnabled) {
			// Get the telemetry endpoint from config or use a default
			logger.debug(`Telemetry initialized with trace ID: ${this.sessionId}`);
		} else {
			logger.info('Telemetry is disabled');
		}
	}

	/**
	 * Get the singleton instance of the telemetry service
	 */
	public static getInstance({
		chargebeeAIClient,
	}: {
		chargebeeAIClient: ChargebeeAIClient;
	}): TelemetryService {
		if (!TelemetryService.instance) {
			TelemetryService.instance = new TelemetryService({ chargebeeAIClient });
			chargebeeAIClient.attachHeaders({
				'X-Chargebee-Session-Id': TelemetryService.instance.getSessionId(),
			});
		}
		return TelemetryService.instance;
	}

	/**
	 * Get the current trace ID
	 */
	public getSessionId(): string {
		return this.sessionId;
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
		if (!this.isEnabled || !this.chargebeeAIClient) {
			return;
		}

		try {
			const eventData: TelemetryData = {
				event: eventName,
				timestamp: new Date().toISOString(),
				sessionId: this.sessionId,
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
		if (!this.chargebeeAIClient) {
			return;
		}

		try {
			await this.chargebeeAIClient.sendTelemetry(data);
		} catch (error) {
			// Log but don't throw to prevent disrupting the main application flow
			logger.debug(
				`Failed to send telemetry: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}
}

export const telemetryService = TelemetryService.getInstance({
	chargebeeAIClient,
});
