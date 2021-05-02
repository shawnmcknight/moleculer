import { Logger } from "../logger-factory";
import Tracer from "./tracer";

declare class Span {
	constructor(tracer: Tracer, name: string, opts: Record<string, any>);

	tracer: Tracer;
	logger: Logger;
	opts: Record<string, any>;
	meta: Record<string, any>

	name: string;
	id: string;
	traceID: string;
	parentID: string | null;

	service?: {
		name: string;
		version: string | number | null | undefined;
	}

	priority: number;
	sampled: boolean;

	startTime: number | null;
	finishTime: number | null;
	duration: number | null;

	error: Error | null;

	logs: Array<SpanLogEntry>;
	tags: Record<string, any>;

	start(time?: number): Span;
	addTags(obj: Record<string, any>): Span;
	log(name: string, fields?: Record<string, any>, time?: number): Span;
	setError(err: Error): Span;
	finish(time?: number): Span;
	startSpan(name: string, opts?: Record<string, any>): Span;
}
export default Span;
