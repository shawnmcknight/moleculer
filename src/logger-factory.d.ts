import { LEVELS } from "./loggers";
import ServiceBroker from "./service-broker";

export type LogLevels = typeof LEVELS;

export type Logger = {
	[level in LogLevels[number]]: (...args: any[]) => void;
}

declare class LoggerFactory {
	constructor(broker: ServiceBroker);
	init(opts: LoggerConfig | Array<LoggerConfig>): void;
	stop(): void;
	getLogger(bindings: Record<string, any>): Logger;
	getBindingsKey(bindings: Record<string, any>): String;

	broker: ServiceBroker;
}
export default LoggerFactory;
