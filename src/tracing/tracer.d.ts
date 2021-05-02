import { Logger } from "../logger-factory";

declare class Tracer {
	constructor(broker: ServiceBroker, opts: TracerOptions | boolean);

	broker: ServiceBroker;
	logger: Logger;
	opts: Record<string, any>;

	exporter: Array<BaseTraceExporter>;

	isEnabled(): boolean;
	shouldSample(span: Span): boolean;

	startSpan(name: string, opts?: Record<string, any>): Span;

	//getCurrentSpan(): Span | null;
	getCurrentTraceID(): string | null;
	getActiveSpanID(): string | null;
}
export default Tracer;
