import { Endpoint } from "./registry";

declare class Context<P = unknown, M extends object = {}> {
	constructor(broker: ServiceBroker, endpoint: Endpoint);
	id: string;
	broker: ServiceBroker;
	endpoint: Endpoint | null;
	action: ActionSchema | null;
	event: EventSchema | null;
	service: Service | null;
	nodeID: string | null;

	eventName: string | null;
	eventType: string | null;
	eventGroups: Array<string> | null;

	options: CallingOptions;

	parentID: string | null;
	caller: string | null;

	tracing: boolean | null;
	span: Span | null;

	needAck: boolean | null;
	ackID: string | null;

	locals: Record<string, any>;

	level: number;

	params: P;
	meta: M;

	requestID: string | null;

	cachedResult: boolean;

	setEndpoint(endpoint: Endpoint): void;
	setParams(newParams: P, cloning?: boolean): void;
	call<T>(actionName: string): Promise<T>;
	call<T, P>(actionName: string, params: P, opts?: CallingOptions): Promise<T>;

	mcall<T>(def: Array<MCallDefinition> | { [name: string]: MCallDefinition }, opts?: CallingOptions): Promise<Array<T> | T>;

	emit<D>(eventName: string, data: D, opts: Record<string, any>): Promise<void>;
	emit<D>(eventName: string, data: D, groups: Array<string>): Promise<void>;
	emit<D>(eventName: string, data: D, groups: string): Promise<void>;
	emit<D>(eventName: string, data: D): Promise<void>;
	emit(eventName: string): Promise<void>;

	broadcast<D>(eventName: string, data: D, opts: Record<string, any>): Promise<void>;
	broadcast<D>(eventName: string, data: D, groups: Array<string>): Promise<void>;
	broadcast<D>(eventName: string, data: D, groups: string): Promise<void>;
	broadcast<D>(eventName: string, data: D): Promise<void>;
	broadcast(eventName: string): Promise<void>;

	copy(endpoint: Endpoint): this;
	copy(): this;

	startSpan(name: string, opts?: Record<string, any>): Span;
	finishSpan(span: Span, time?: number): void;

	toJSON(): Record<string, any>;

	static create(broker: ServiceBroker, endpoint: Endpoint, params: Record<string, any>, opts: Record<string, any>): Context;
	static create(broker: ServiceBroker, endpoint: Endpoint, params: Record<string, any>): Context;
	static create(broker: ServiceBroker, endpoint: Endpoint): Context;
	static create(broker: ServiceBroker): Context;
}
export default Context;
