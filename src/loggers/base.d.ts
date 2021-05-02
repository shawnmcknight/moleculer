import LoggerFactory from "../logger-factory";

declare abstract class BaseLogger {
	static readonly LEVELS: ["fatal", "error", "warn", "info", "debug", "trace"];

	constructor(opts?: Record<string, any>);
	init(loggerFactory: LoggerFactory): void
	stop(): void;
	getLogLevel(mod: string): string;
	getLogHandler(bindings: Record<string, any>): Record<string, any>;
}
export default BaseLogger;
