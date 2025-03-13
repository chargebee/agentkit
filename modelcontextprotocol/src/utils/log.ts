const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

/**
 * Wraps text with ANSI escape codes to display it in red color in the console
 * @param text - The string to be colored in red
 * @returns The input string wrapped with ANSI red color codes
 * @example
 * console.log(red('Error message')); // Prints 'Error message' in red
 */
export function red(text: string) {
	return `${RED}${text}${RESET}`;
}

/**
 * Wraps text with ANSI escape codes to display it in green color in the console
 * @param text - The string to be colored in green
 * @returns The input string wrapped with ANSI green color codes
 * @example
 * console.log(green('Success message')); // Prints 'Success message' in green
 */
export function green(text: string) {
	return `${GREEN}${text}${RESET}`;
}

/**
 * Wraps text with ANSI escape codes to display it in yellow color in the console
 * @param text - The string to be colored in yellow
 * @returns The input string wrapped with ANSI yellow color codes
 * @example
 * console.log(yellow('Warning message')); // Prints 'Warning message' in yellow
 */
export function yellow(text: string) {
	return `${YELLOW}${text}${RESET}`;
}

/**
 * Wraps text with ANSI escape codes to display it in blue color in the console
 * @param text - The string to be colored in blue
 * @returns The input string wrapped with ANSI blue color codes
 * @example
 * console.log(blue('Info message')); // Prints 'Info message' in blue
 */
export function blue(text: string) {
	return `${BLUE}${text}${RESET}`;
}

/**
 * Log levels enum for the logger
 */
export enum LogLevel {
	ERROR = 0,
	WARN = 1,
	INFO = 2,
	DEBUG = 3,
}

/**
 * Logger class that provides leveled logging with color support
 */
export class Logger {
	private level: LogLevel;

	constructor(level: LogLevel = LogLevel.INFO) {
		this.level = level;
	}

	/**
	 * Set the current log level
	 * @param level - The new log level to set
	 */
	setLevel(level: LogLevel): void {
		this.level = level;
	}

	/**
	 * Get the current log level
	 * @returns The current log level
	 */
	getLevel(): LogLevel {
		return this.level;
	}

	/**
	 * Log an error message
	 * @param message - The error message to log
	 * @param ...args - Additional arguments to log
	 */
	error(message: string, ...args: any[]): void {
		if (this.level >= LogLevel.ERROR) {
			console.error(red(`[ERROR] ${message}`), ...args);
		}
	}

	/**
	 * Log a warning message
	 * @param message - The warning message to log
	 * @param ...args - Additional arguments to log
	 */
	warn(message: string, ...args: any[]): void {
		if (this.level >= LogLevel.WARN) {
			console.warn(yellow(`[WARN] ${message}`), ...args);
		}
	}

	/**
	 * Log an info message
	 * @param message - The info message to log
	 * @param ...args - Additional arguments to log
	 */
	info(message: string, ...args: any[]): void {
		if (this.level >= LogLevel.INFO) {
			console.info(blue(`[INFO] ${message}`), ...args);
		}
	}

	/**
	 * Log a debug message
	 * @param message - The debug message to log
	 * @param ...args - Additional arguments to log
	 */
	debug(message: string, ...args: any[]): void {
		if (this.level >= LogLevel.DEBUG) {
			console.debug(green(`[DEBUG] ${message}`), ...args);
		}
	}
}

// Create a default logger instance
export const logger = new Logger();
