import { EventEmitter2 } from "eventemitter2";
import { MoleculerRepl } from "./addons/moleculerRepl";
import AsyncStorage from "./async-storage";
import { NodeHealthStatus } from "./health";
import { Logger } from "./logger-factory";
import MetricRegistry from "./metrics/registry";
import Registry from "./registry";
import ActionEndpoint from "./registry/endpoint-action";
import EventEndpoint from "./registry/endpoint-event";
import Node from "./registry/node";
import { Tracer } from "./tracing";

export interface BrokerHotReloadOptions {
	modules?: Array<string>;
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

	hotReload?: boolean | BrokerHotReloadOptions;

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

declare class ServiceBroker {
	constructor(options?: BrokerOptions);

	options: BrokerOptions;

	Promise: PromiseConstructorLike;
	ServiceFactory: typeof Service;
	ContextFactory: typeof Context;

	started: boolean;

	namespace: string;
	nodeID: string;
	instanceID: string;

	logger: Logger;

	services: Array<Service>;

	localBus: EventEmitter2;

	scope: AsyncStorage;
	metrics: MetricRegistry;

	middlewares: MiddlewareHandler;

	registry: Registry;

	cacher?: Cacher;
	serializer?: Serializer;
	validator?: BaseValidator;

	tracer: Tracer;

	transit?: Transit;

	start(): Promise<void>;
	stop(): Promise<void>;

	repl(): MoleculerRepl | undefined;

	errorHandler(err: Error, info: Record<string, any>): void;

	wrapMethod(method: string, handler: ActionHandler, bindTo: any, opts: MiddlewareCallHandlerOptions): typeof handler;
	callMiddlewareHookSync(name: string, args: any[], opts: MiddlewareCallHandlerOptions): Promise<void>;
	callMiddlewareHook(name: string, args: any[], opts: MiddlewareCallHandlerOptions): void;

	isMetricsEnabled(): boolean;
	isTracingEnabled(): boolean;

	getLogger(module: string, props?: Record<string, any>): Logger;
	fatal(message: string, err?: Error, needExit?: boolean): void;

	loadServices(folder?: string, fileMask?: string): number;
	loadService(filePath: string): Service;
	createService(schema: ServiceSchema, schemaMods?: ServiceSchema): Service;
	destroyService(service: Service | string | ServiceSearchObj): Promise<void>;

	getLocalService(name: string | ServiceSearchObj): Service;
	waitForServices(serviceNames: string | Array<string> | Array<ServiceSearchObj>, timeout?: number, interval?: number, logger?: Logger): Promise<void>;

	findNextActionEndpoint(actionName: string, opts?: Record<string, any>, ctx?: Context): ActionEndpoint | MoleculerRetryableError;

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

	broadcastLocal<D>(eventName: string, data: D, opts: Record<string, any>): Promise<void>;
	broadcastLocal<D>(eventName: string, data: D, groups: Array<string>): Promise<void>;
	broadcastLocal<D>(eventName: string, data: D, groups: string): Promise<void>;
	broadcastLocal<D>(eventName: string, data: D): Promise<void>;
	broadcastLocal(eventName: string): Promise<void>;

	ping(): Promise<PongResponses>;
	ping(nodeID: string | Array<string>, timeout?: number): Promise<PongResponse>;

	getHealthStatus(): NodeHealthStatus;
	getLocalNodeInfo(): Node;

	getCpuUsage(): Promise<any>;
	generateUid(): string;

	hasEventListener(eventName: string): boolean;
	getEventListener(eventName: string): Array<EventEndpoint>;

	getConstructorName(obj: any): string;

	MOLECULER_VERSION: string;
	PROTOCOL_VERSION: string;
	[name: string]: any;

	static MOLECULER_VERSION: string;
	static PROTOCOL_VERSION: string;
	static defaultOptions: BrokerOptions;
	static Promise: PromiseConstructorLike;
}
export default ServiceBroker;
