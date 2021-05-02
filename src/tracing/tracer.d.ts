import { Logger } from "../logger-factory";

export interface TracerExporterOptions {
	type: string;
	options?: Record<string, any>;
}

export interface TracerOptions {
	enabled?: boolean;
	exporter?: string | TracerExporterOptions | Array<TracerExporterOptions|string> | null;
	sampling?: {
		rate?: number | null;
		tracesPerSecond?: number | null;
		minPriority?: number | null;
	}

	actions?: boolean;
	events?: boolean;

	errorFields?: Array<string>;
	stackTrace?: boolean;

	defaultTags?: Record<string, any> | Function | null;

	tags?: {
		action?: TracingActionTags;
		event?: TracingEventTags;
	}
}

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
