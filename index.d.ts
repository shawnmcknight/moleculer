import { EventEmitter2 } from "eventemitter2";
import Cachers from "./src/cachers";
import Context from "./src/context";
import { MoleculerError, MoleculerRetryableError } from "./src/errors";
import Loggers from "./src/loggers";
import { Packet } from "./src/packets";
import { MetricBaseReporter } from "./src/metrics/reporters";
import { BaseMetricPOJO } from "./src/metrics/types";
import { DiscovererOptions } from "./src/registry/discoverers";
import { Base as Serializer } from "./src/serializers";
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

export * as Discoverers from "./src/registry/discoverers";

export * as Serializers from "./src/serializers";

export { default as ServiceBroker } from "./src/service-broker";

export * as Strategies from "./src/strategies";

export * as Transporters from "./src/transporters";

export * as TracerExporters from "./src/tracing/exporters";

export * as Utils from "./src/utils";

export * as Validators from "./src/validators";
export { Fastest as Validator } from "./src/validators"; // deprecated

/**
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

export type LogLevels = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export class LoggerFactory {
	constructor(broker: ServiceBroker);
	init(opts: LoggerConfig | Array<LoggerConfig>): void;
	stop(): void;
	getLogger(bindings: Record<string, any>): LoggerInstance;
	getBindingsKey(bindings: Record<string, any>): String;

	broker: ServiceBroker;
}

export interface LoggerBindings {
	nodeID: string;
	ns: string;
	mod: string;
	svc: string;
	ver: string | void;
}

export class LoggerInstance {
	fatal(...args: any[]): void;
	error(...args: any[]): void;
	warn(...args: any[]): void;
	info(...args: any[]): void;
	debug(...args: any[]): void;
	trace(...args: any[]): void;
}

export type ActionHandler<T = any> = ((ctx: Context<any, any>) => Promise<T> | T) & ThisType<Service>;
export type ActionParamSchema = { [key: string]: any };
export type ActionParamTypes =
	| "any"
	| "array"
	| "boolean"
	| "custom"
	| "date"
	| "email"
	| "enum"
	| "forbidden"
	| "function"
	| "number"
	| "object"
	| "string"
	| "url"
	| "uuid"
	| boolean
	| ActionParamSchema;
export type ActionParams = { [key: string]: ActionParamTypes };

export interface HotReloadOptions {
	modules?: Array<string>;
}

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

export class Tracer {
	constructor(broker: ServiceBroker, opts: TracerOptions | boolean);

	broker: ServiceBroker;
	logger: LoggerInstance;
	opts: Record<string, any>;

	exporter: Array<BaseTraceExporter>;

	isEnabled(): boolean;
	shouldSample(span: Span): boolean;

	startSpan(name: string, opts?: Record<string, any>): Span;

	//getCurrentSpan(): Span | null;
	getCurrentTraceID(): string | null;
	getActiveSpanID(): string | null;
}

export interface SpanLogEntry {
	name: string;
	fields: Record<string, any>;
	time: number;
	elapsed: number;
}

export class Span {
	constructor(tracer: Tracer, name: string, opts: Record<string, any>);

	tracer: Tracer;
	logger: LoggerInstance;
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

export interface MetricsReporterOptions {
	type: string;
	options?: MetricReporterOptions;
}

export interface MetricRegistryOptions {
	enabled?: boolean;
	collectProcessMetrics?: boolean;
	collectInterval?: number;
	reporter?: string | MetricsReporterOptions | Array<MetricsReporterOptions|string> | null;
	defaultBuckets?: Array<number>;
	defaultQuantiles?: Array<number>;
	defaultMaxAgeSeconds?: number;
	defaultAgeBuckets?: number;
	defaultAggregator?: number;
}

export type MetricSnapshot = GaugeMetricSnapshot | InfoMetricSnapshot | HistogramMetricSnapshot;

export interface MetricListOptions {
	type: string | Array<string>;
	includes: string | Array<string>;
	excludes: string | Array<string>;
}

export class MetricRegistry {
	broker: ServiceBroker;
	logger: LoggerInstance;
	dirty: boolean;
	store: Map<String, BaseMetric>;
	reporter: Array<MetricBaseReporter>;

	constructor(broker: ServiceBroker, opts?: MetricRegistryOptions);
	init(broker: ServiceBroker): void;
	stop(): void;
	isEnabled(): boolean;
	register(opts: BaseMetricOptions): BaseMetric | null;

	hasMetric(name: string): boolean;
	getMetric(name: string): BaseMetric;

	increment(name: string, labels?: Record<string, any>, value?: number, timestamp?: number): void;
	decrement(name: string, labels?: Record<string, any>, value?: number, timestamp?: number): void;
	set(name: string, value: any | null, labels?: Record<string, any>, timestamp?: number): void;
	observe(name: string, value: number, labels?: Record<string, any>, timestamp?: number): void;

	reset(name: string, labels?: Record<string, any>, timestamp?: number): void;
	resetAll(name: string, timestamp?: number): void;

	timer(name: string, labels?: Record<string, any>, timestamp?: number): () => number;

	changed(metric: BaseMetric, value: any | null, labels?: Record<string, any>, timestamp?: number): void;

	list(opts?: MetricListOptions): Array<BaseMetricPOJO>;
}

export interface BulkheadOptions {
	enabled?: boolean;
	concurrency?: number;
	maxQueueSize?: number;
}

export type ActionCacheEnabledFuncType = (ctx: Context<any, any>) => boolean;

export interface ActionCacheOptions {
	enabled?: boolean | ActionCacheEnabledFuncType;
	ttl?: number;
	keys?: Array<string>;
	lock?: {
		enabled?: boolean;
		staleTime?: number;
	};
}

export type ActionVisibility = "published" | "public" | "protected" | "private";

export type ActionHookBefore = (ctx: Context<any, any>) => Promise<void> | void;
export type ActionHookAfter = (ctx: Context<any, any>, res: any) => Promise<any> | any;
export type ActionHookError = (ctx: Context<any, any>, err: Error) => Promise<void> | void;

export interface ActionHooks {
	before?: string | ActionHookBefore | Array<string | ActionHookBefore>;
	after?: string | ActionHookAfter | Array<string | ActionHookAfter>;
	error?: string | ActionHookError | Array<string | ActionHookError>;
}

export interface RestSchema{
	path?: string,
	method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
	fullPath?: string,
	basePath?: string,
}

export interface ActionSchema {
	name?: string;
	rest?: RestSchema | string | string[],
	visibility?: ActionVisibility;
	params?: ActionParams;
	service?: Service;
	cache?: boolean | ActionCacheOptions;
	handler?: ActionHandler;
	tracing?: boolean | TracingActionOptions;
	bulkhead?: BulkheadOptions;
	circuitBreaker?: BrokerCircuitBreakerOptions;
	retryPolicy?: RetryPolicyOptions;
	fallback?: string | FallbackHandler;
	hooks?: ActionHooks;

	[key: string]: any;
}

export interface EventSchema {
	name?: string;
	group?: string;
	params?: ActionParams;
	service?: Service;
	tracing?: boolean | TracingEventOptions;
	bulkhead?: BulkheadOptions;
	handler?: ActionHandler;
	context?: boolean;

	[key: string]: any;
}

export type ServiceActionsSchema = { [key: string]: ActionSchema | ActionHandler | boolean; };

export class BrokerNode {
	id: string;
	instanceID: string | null;
	available: boolean;
	local: boolean;
	lastHeartbeatTime: number;
	config: Record<string, any>;
	client: Record<string, any>;
	metadata: Record<string, any>;

	ipList: Array<string>;
	port: number| null;
	hostname: string | null;
	udpAddress: string | null;

	rawInfo: Record<string, any>;
	services: [Record<string, any>];

	cpu: number | null;
	cpuSeq: number | null;

	seq: number;
	offlineSince: number | null;

	heartbeat(payload: Record<string, any>): void;
	disconnected(): void;
}

export interface ServiceSettingSchema {
	$noVersionPrefix?: boolean;
	$noServiceNamePrefix?: boolean;
	$dependencyTimeout?: number;
	$shutdownTimeout?: number;
	$secureSettings?: Array<string>;
	[name: string]: any;
}

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

export interface ServiceHooksBefore {
	[key: string]: string | ActionHookBefore | Array<string | ActionHookBefore>;
}

export interface ServiceHooksAfter {
	[key: string]: string | ActionHookAfter | Array<string | ActionHookAfter>;
}

export interface ServiceHooksError {
	[key: string]: string | ActionHookError | Array<string | ActionHookError>;
}

export interface ServiceHooks {
	before?: ServiceHooksBefore,
	after?: ServiceHooksAfter,
	error?: ServiceHooksError,
}

export interface ServiceDependency {
	name: string;
	version?: string | number;
}

export interface ServiceSchema<S = ServiceSettingSchema> {
	name: string;
	version?: string | number;
	settings?: S;
	dependencies?: string | ServiceDependency | Array<string | ServiceDependency>;
	metadata?: Record<string, any>;
	actions?: ServiceActionsSchema;
	mixins?: Array<Partial<ServiceSchema>>;
	methods?: ServiceMethods;
	hooks?: ServiceHooks;

	events?: ServiceEvents;
	created?: (() => void) | Array<() => void>;
	started?: (() => Promise<void>) | Array<() => Promise<void>>;
	stopped?: (() => Promise<void>) | Array<() => Promise<void>>;

	[name: string]: any;
}

export type ServiceAction = (<T = Promise<any>, P extends Record<string, any> = Record<string, any>>(params?: P, opts?: CallingOptions) => T) & ThisType<Service>;

export interface ServiceActions {
	[name: string]: ServiceAction;
}

export interface WaitForServicesResult {
	services: string[];
	statuses: Array<{ name: string; available: boolean}>;
}

export class Service<S = ServiceSettingSchema> implements ServiceSchema {
	constructor(broker: ServiceBroker, schema?: ServiceSchema<S>);

	protected parseServiceSchema(schema: ServiceSchema<S>): void;

	name: string;
	fullName: string;
	version?: string | number;
	settings: S;
	metadata: Record<string, any>;
	dependencies: string | ServiceDependency | Array<string | ServiceDependency>;
	schema: ServiceSchema<S>;
	originalSchema: ServiceSchema<S>;
	broker: ServiceBroker;
	logger: LoggerInstance;
	actions: ServiceActions;
	Promise: PromiseConstructorLike;
	//currentContext: Context | null;

	_init(): void;
	_start(): Promise<void>;
	_stop(): Promise<void>;

	/**
	 * Wait for the specified services to become available/registered with this broker.
	 *
	 * @param serviceNames The service, or services, we are waiting for.
	 * @param timeout The total time this call may take. If this time has passed and the service(s)
	 * 						    are not available an error will be thrown. (In milliseconds)
	 * @param interval The time we will wait before once again checking if the service(s) are available (In milliseconds)
	 */
	waitForServices(serviceNames: string | Array<string> | Array<ServiceDependency>, timeout?: number, interval?: number, logger?: LoggerInstance): Promise<WaitForServicesResult>;


	[name: string]: any;

	static applyMixins(schema: ServiceSchema): ServiceSchema;
	static mergeSchemas(mixinSchema: ServiceSchema, svcSchema: ServiceSchema): ServiceSchema;
	static mergeSchemaSettings(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaMetadata(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaMixins(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaDependencies(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaHooks(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaActions(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaMethods(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaEvents(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaLifecycleHandlers(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
	static mergeSchemaUnknown(src: Record<string, any>, target: Record<string, any>): Record<string, any>;
}

export type CheckRetryable = (err: Error) => boolean;

export interface BrokerCircuitBreakerOptions {
	enabled?: boolean,
	threshold?: number;
	windowTime?: number;
	minRequestCount?: number;
	halfOpenTime?: number;
	check?: CheckRetryable;
}

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

export interface BrokerTransitOptions {
	maxQueueSize?: number;
	disableReconnect?: boolean;
	disableVersionCheck?: boolean;
	maxChunkSize?: number;
}

export interface BrokerTrackingOptions {
	enabled?: boolean;
	shutdownTimeout?: number;
}

export interface LogLevelConfig {
	[module: string]: boolean | LogLevels;
}

export interface LoggerConfig {
	type: string,
	options?: Record<string, any>
}

export interface BrokerOptions {
	namespace?: string;
	nodeID?: string;

	logger?: Loggers.Base | LoggerConfig | Array<LoggerConfig> | boolean;
	logLevel?: LogLevels | LogLevelConfig;

	transporter?: Transporter | string | Record<string, any>;
	requestTimeout?: number;
	retryPolicy?: RetryPolicyOptions;

	contextParamsCloning?: boolean;
	maxCallLevel?: number;
	heartbeatInterval?: number;
	heartbeatTimeout?: number

	tracking?: BrokerTrackingOptions;

	disableBalancer?: boolean;

	registry?: BrokerRegistryOptions;

	circuitBreaker?: BrokerCircuitBreakerOptions;

	bulkhead?: BulkheadOptions;

	transit?: BrokerTransitOptions;

	uidGenerator?: () => string;

	errorHandler?: (err: Error, info: any) => void;

	cacher?: boolean | Cacher | string | Record<string, any>;
	serializer?: Serializer | string | Record<string, any>;
	validator?: boolean | BaseValidator | ValidatorNames | ValidatorOptions;

	metrics?: boolean | MetricRegistryOptions;
	tracing?: boolean | TracerOptions;

	internalServices?: boolean | {
		[key: string]: Partial<ServiceSchema>
	};
	internalMiddlewares?: boolean;

	dependencyInterval?: number;

	hotReload?: boolean | HotReloadOptions;

	middlewares?: Array<Middleware | string>;

	replCommands?: Array<Record<string, any>>;
	replDelimiter?: string;

	metadata?: Record<string, any>;

	ServiceFactory?: typeof Service;
	ContextFactory?: typeof Context;
	Promise?: PromiseConstructorLike;

	created?: (broker: ServiceBroker) => void;
	started?: (broker: ServiceBroker) => void;
	stopped?: (broker: ServiceBroker) => void;

	/**
	 * If true, process.on("beforeExit/exit/SIGINT/SIGTERM", ...) handler won't be registered!
	 * You have to register this manually and stop broker in this case!
	 */
	skipProcessEventRegistration?: boolean;
}

export interface NodeHealthStatus {
	cpu: {
		load1: number;
		load5: number;
		load15: number;
		cores: number;
		utilization: number;
	};
	mem: {
		free: number;
		total: number;
		percent: number;
	};
	os: {
		uptime: number;
		type: string;
		release: string;
		hostname: string;
		arch: string;
		platform: string;
		user: string;
	};
	process: {
		pid: NodeJS.Process["pid"];
		memory: NodeJS.MemoryUsage;
		uptime: number;
		argv: string[];
	};
	client: {
		type: string;
		version: string;
		langVersion: NodeJS.Process["version"];
	};
	net: {
		ip: string[];
	};
	time: {
		now: number;
		iso: string;
		utc: string;
	};
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

export interface Endpoint {
	broker: ServiceBroker;

	id: string;
	node: Record<string, any>;

	local: boolean;
	state: boolean;
}

export interface ActionEndpoint extends Endpoint {
	service: Service;
	action: ActionSchema;
}

export interface EventEndpoint extends Endpoint {
	service: Service;
	event: EventSchema;
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

export interface MoleculerRepl extends Vorpal{
	removeIfExist(command:string): void;
}

export type Cacher<T extends Cachers.Base = Cachers.Base> = T;

export type ValidatorNames = "Fastest"

export interface ValidatorOptions {
	type: string,
	options?: Record<string, any>
}

export interface TransitRequest {
	action: string;
	nodeID: string;
	ctx: Context;
	resolve: (value: any) => void;
	reject: (reason: any) => void;
	stream: boolean;
}

export interface Transit {
	pendingRequests: Map<string, TransitRequest>
	nodeID: string;
	logger: LoggerInstance;
	connected: boolean;
	disconnecting: boolean;
	isReady: boolean;
	tx: Transporter

	afterConnect(wasReconnect: boolean): Promise<void>;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	ready(): Promise<void>;
	sendDisconnectPacket(): Promise<void>;
	makeSubscriptions(): Promise<Array<void>>;
	messageHandler(cmd: string, msg: Record<string, any>): boolean | Promise<void> | undefined;
	request(ctx: Context): Promise<void>;
	sendEvent(ctx: Context): Promise<void>;
	removePendingRequest(id: string): void;
	removePendingRequestByNodeID(nodeID: string): void;
	sendResponse(nodeID: string, id: string, data: Record<string, any>, err: Error): Promise<void>;
	sendResponse(nodeID: string, id: string, data: Record<string, any>): Promise<void>;
	discoverNodes(): Promise<void>;
	discoverNode(nodeID: string): Promise<void>;
	sendNodeInfo(info: BrokerNode, nodeID?: string): Promise<void | Array<void>>;
	sendPing(nodeID: string, id?: string): Promise<void>;
	sendPong(payload: Record<string, any>): Promise<void>;
	processPong(payload: Record<string, any>): void;
	sendHeartbeat(localNode: BrokerNode): Promise<void>;
	subscribe(topic: string, nodeID: string): Promise<void>;
	publish(packet: Packet): Promise<void>;
}

export interface ActionCatalogListOptions {
	onlyLocal?:boolean;
	onlyAvailable?:boolean;
	skipInternal?:boolean;
	withEndpoints?:boolean;
}

export class ServiceRegistry {
	broker: ServiceBroker;
	metrics: MetricRegistry;
	logger: LoggerInstance;

	opts: BrokerRegistryOptions;

	StrategyFactory: BaseStrategy;

	nodes: any;
	services: any;
	actions: any;
	events: any;

	getServiceList(opts?: ActionCatalogListOptions): ServiceSchema[]
}

export class AsyncStorage {
	broker: ServiceBroker;
	store: Map<string, any>;

	constructor(broker: ServiceBroker);

	enable(): void;
	disable(): void;
	stop(): void;
	getAsyncId(): number;
	setSessionData(data: any): void;
	getSessionData(): any | null;
}

export class Vorpal {
	parse(argv: ReadonlyArray<string>): this;
	delimiter(value: string): this;
	show(): this;
	hide(): this;
	find(command: string): Vorpal.Command;
	exec(command: string): Promise<{}>;
	execSync(command: string): Promise<{}>;
	log(value: string, ...values: string[]): this;
	history(id: string): this;
	localStorage(id: string): object;
	help(value: (cmd: string) => string): this;
	pipe(value: (stdout: string) => string): this;
	use(extension: Vorpal.Extension): this;
	catch(command: string, description?: string): Vorpal.Catch;
	command(command: string, description?: string): Vorpal.Command;
	version(version: string): this;
	sigint(value: () => void): this;
	ui: Vorpal.UI;
	activeCommand: Vorpal.CommandInstance;
}

export namespace Vorpal {
	export interface Args {
		[key: string]: any;
		options: {
			[key: string]: any;
		};
	}

	export interface PromptObject {
		[key: string]: any;
	}

	export type Action = (args: Args) => Promise<void>;
	export type Cancel = () => void;

	export class Command {
		_name: string;
		_fn: Action;
		_cancel: Cancel | undefined;
		alias(command: string): this;
		parse(value: (command: string, args: Args) => string): this;
		option(option: string, description: string, autocomplete?: ReadonlyArray<string>): this;
		types(types: { string?: ReadonlyArray<string> }): this;
		hidden(): this;
		remove(): this;
		help(value: (args: Args) => void): this;
		validate(value: (args: Args) => boolean | string): this;
		autocomplete(values: ReadonlyArray<string> | { data: () => Promise<ReadonlyArray<string>> }): this;
		action(action: Action): this;
		cancel(cancel: Cancel): this;
		allowUnknownOptions(): this;
	}

	export class Catch extends Command { }

	export class Extension { }

	export class UI {
		delimiter(text?: string): string;
		input(text?: string): string;
		imprint(): void;
		submit(command: string): string;
		cancel(): void;
		redraw: {
			(text: string, ...texts: string[]): void;
			clear(): void;
			done(): void;
		};
	}

	export class CommandInstance {
		log(value: string, ...values: string[]): void;
		prompt(prompt: object | ReadonlyArray<object>): Promise<PromptObject>;
		delimiter(value: string): void;
	}
}
