declare class Base {
	constructor(opts?: Record<string, any>);
	init(loggerFactory: LoggerFactory): void
	stop(): void;
	getLogLevel(mod: string): string
	getLogHandler(bindings: Record<string, any>): Record<string, any>
}
export default Base;
