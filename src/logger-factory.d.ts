import ServiceBroker from "./service-broker";

declare class LoggerFactory {
	constructor(broker: ServiceBroker);
	init(opts: LoggerConfig | Array<LoggerConfig>): void;
	stop(): void;
	getLogger(bindings: Record<string, any>): LoggerInstance;
	getBindingsKey(bindings: Record<string, any>): String;

	broker: ServiceBroker;
}
export default LoggerFactory;
