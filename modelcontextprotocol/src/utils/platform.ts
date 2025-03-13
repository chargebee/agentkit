import os from 'os';

export function getPlatformInfo() {
	return `${os.platform()}`;
}