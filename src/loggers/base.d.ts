import LoggerFactory from "../logger-factory";

declare abstract class BaseLogger {
	constructor(opts?: Record<string, any>);
	init(loggerFactory: LoggerFactory): void
	stop(): void;
	getLogLevel(mod: string): string
	getLogHandler(bindings: Record<string, any>): Record<string, any>
}
export default BaseLogger;
