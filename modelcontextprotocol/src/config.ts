import packageJson from '../package.json' assert { type: 'json' };

export const config = {
	version: packageJson.version,
	telemetry: {
		disabled: process.env.CHARGEBEE_TELEMETRY_DISABLED === '1',
	},
};
