import Cachers from "./src/cachers";
import Context from "./src/context";
import { MoleculerError, MoleculerRetryableError } from "./src/errors";
import Loggers from "./src/loggers";
import { Packet } from "./src/packets";
import { MetricRegistryOptions } from "./src/metrics";
import { MetricBaseReporter } from "./src/metrics/reporters";
import { BaseMetricPOJO } from "./src/metrics/types";
import { DiscovererOptions } from "./src/registry/discoverers";
import { Base as Serializer } from "./src/serializers";
import Service from "./src/service";
import ServiceBroker from "./src/service-broker";
import { Base as BaseStrategy } from "./src/strategies";
import { Base as Transporter } from "./src/transporters";
import { Base as BaseTraceExporter } from "./src/tracing/exporters";
import { Base as BaseValidator } from "./src/validators";

export * as Cachers from "./src/cachers";
export { CacherOptions, MemoryCacherOptions, MemoryLRUCacherOptions, RedisCacherOptions } from "./src/cachers";

export * from "./src/constants";

export { default as Context } from "./src/context";

export * as Errors from "./src/errors";

export * as Loggers from "./src/loggers";

export * as MetricReporters from "./src/metrics/reporters";
export { MetricReporterOptions } from "./src/metrics/reporters";

export * as MetricTypes from "./src/metrics/types";
export {
	BaseMetricOptions,
	BaseMetricPOJO,
	GaugeMetricSnapshot,
	HistogramMetricSnapshot,
	InfoMetricSnapshot
} from "./src/metrics/types";

export { default as Registry } from "./src/registry";

export * as Discoverers from "./src/registry/discoverers";

export * as Serializers from "./src/serializers";

export { default as Service } from "./service";

export { default as ServiceBroker } from "./src/service-broker";

export * as Strategies from "./src/strategies";

export * as Transporters from "./src/transporters";

export * as TracerExporters from "./src/tracing/exporters";

export * as Utils from "./src/utils";

export * as Validators from "./src/validators";
export { Fastest as Validator } from "./src/validators"; // deprecated

/*
 * Moleculer uses global.Promise as the default promise library
 * If you are using a third-party promise library (e.g. Bluebird), you will need to
 * assign export type definitions to use for your promise library.  You will need to have a .d.ts file
 * with the following code when you compile:
 *
 * - import Bluebird from "bluebird";
 *   declare module "moleculer" {
 *     export type Promise<T> = Bluebird<T>;
 *   }
 */

export interface SpanLogEntry {
	name: string;
	fields: Record<string, any>;
	time: number;
	elapsed: number;
}

export type TracingActionTagsFuncType = (ctx: Context, response?: any) => Record<string, any>;
export type TracingActionTags = TracingActionTagsFuncType | {
	params?: boolean | string[];
	meta?: boolean | string[];
	response?: boolean | string[];
}

export type TracingEventTagsFuncType = (ctx: Context) => Record<string, any>;
export type TracingEventTags = TracingEventTagsFuncType | {
	params?: boolean | string[];
	meta?: boolean | string[];
}

export interface TracingOptions {
	enabled?: boolean;
	tags?: TracingActionTags | TracingEventTags;
}

export interface TracingActionOptions extends TracingOptions {
	tags?: TracingActionTags;
}

export interface TracingEventOptions extends TracingOptions {
	tags?: TracingEventTags;
}

export type MetricSnapshot = GaugeMetricSnapshot | InfoMetricSnapshot | HistogramMetricSnapshot;

export interface BulkheadOptions {
	enabled?: boolean;
	concurrency?: number;
	maxQueueSize?: number;
}

export interface RestSchema{
	path?: string,
	method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
	fullPath?: string,
	basePath?: string,
}

export type ServiceActionsSchema = { [key: string]: ActionSchema | ActionHandler | boolean; };

export type ServiceEventLegacyHandler = ((payload: any, sender: string, eventName: string, ctx: Context) => void) & ThisType<Service>;

export type ServiceEventHandler = ((ctx: Context) => void) & ThisType<Service>;

export interface ServiceEvent {
	name?: string;
	group?: string;
	params?: ActionParams;
	context?: boolean;
	debounce?: number;
	throttle?: number;
	handler?: ServiceEventHandler | ServiceEventLegacyHandler;
}

export type ServiceEvents = { [key: string]: ServiceEventHandler | ServiceEventLegacyHandler | ServiceEvent };

export type ServiceMethods = { [key: string]: ((...args: any[]) => any) } & ThisType<Service>;

export type CallMiddlewareHandler = (actionName: string, params: any, opts: CallingOptions) => Promise<any>;
export type Middleware = {
	[name: string]:
		| ((handler: ActionHandler, action: ActionSchema) => any)
		| ((handler: ActionHandler, event: ServiceEvent) => any)
		| ((handler: ActionHandler) => any)
		| ((service: Service) => any)
		| ((broker: ServiceBroker) => any)
		| ((handler: CallMiddlewareHandler) => CallMiddlewareHandler)
}

export type MiddlewareInit = (broker: ServiceBroker) => Middleware & ThisType<ServiceBroker>;
export interface MiddlewareCallHandlerOptions {
	reverse?: boolean
}

export interface MiddlewareHandler {
	list: Middleware[];

	add(mw: string | Middleware | MiddlewareInit): void;
	wrapHandler(method: string, handler: ActionHandler, def: ActionSchema): typeof handler;
	callHandlers(method: string, args: any[], opts: MiddlewareCallHandlerOptions): Promise<void>;
	callSyncHandlers(method: string, args: any[], opts: MiddlewareCallHandlerOptions): void;
	count(): number;
	wrapMethod(method: string, handler: ActionHandler, bindTo: any, opts: MiddlewareCallHandlerOptions): typeof handler;
}

export interface WaitForServicesResult {
	services: string[];
	statuses: Array<{ name: string; available: boolean}>;
}

export type CheckRetryable = (err: Error) => boolean;

export interface RetryPolicyOptions {
	enabled?: boolean,
	retries?: number;
	delay?: number;
	maxDelay?: number;
	factor?: number;
	check: CheckRetryable;
}

export interface BrokerRegistryOptions {
	strategy?: Function | string;
	strategyOptions?: Record<string, any>;
	preferLocal?: boolean;
	discoverer?: RegistryDiscovererOptions | BaseDiscoverer | string;
}

export interface RegistryDiscovererOptions {
	type: string,
	options: DiscovererOptions
}

export interface LogLevelConfig {
	[module: string]: boolean | LogLevels;
}

export interface LoggerConfig {
	type: string,
	options?: Record<string, any>
}

export type FallbackHandler = (ctx: Context, err: MoleculerError) => Promise<any>;
export type FallbackResponse = string | number | Record<string, any>;
export type FallbackResponseHandler = (ctx: Context, err: MoleculerError) => Promise<any>;

export interface CallingOptions {
	timeout?: number;
	retries?: number;
	fallbackResponse?: FallbackResponse | Array<FallbackResponse> | FallbackResponseHandler;
	nodeID?: string;
	meta?: Record<string, any>;
	parentCtx?: Context;
	requestID?: string;
	tracking?: boolean;
	paramsCloning?: boolean;
	caller?: string;
}

export interface CallDefinition<P extends Record<string, any> = Record<string, any>> {
	action: string;
	params: P;
}

export interface MCallDefinition<P extends Record<string, any> = Record<string, any>> extends CallDefinition<P> {
	options?: CallingOptions;
}

export interface PongResponse {
	nodeID: string;
	elapsedTime: number;
	timeDiff: number
}

export interface PongResponses {
	[name: string]: PongResponse;
}

export interface ServiceSearchObj {
	name: string;
	version?: string|number;
}

export type Cacher<T extends Cachers.Base = Cachers.Base> = T;

export type ValidatorNames = "Fastest"

export interface ValidatorOptions {
	type: string,
	options?: Record<string, any>
}
