import Span from "../span";
import Tracer from "../tracer";

declare abstract class BaseTraceExporter {
	opts: Record<string, any>;
	tracer: Tracer;
	logger: LoggerInstance;

	constructor(opts: Record<string, any>);
	init(tracer: Tracer): void;

	spanStarted(span: Span): void;
	spanFinished(span: Span): void;

	flattenTags(obj: Record<string, any>, convertToString?: boolean, path?: string): Record<string, any>;
	errorToObject(err: Error): Record<string, any>;
}
export default BaseTraceExporter;
