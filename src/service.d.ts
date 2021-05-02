import { Logger } from "./logger-factory";

// #region Cache
export type ActionCacheEnabledFunctionSignature = (ctx: Context<any, any>) => boolean;

export interface ActionCacheOptions {
	enabled?: boolean | ActionCacheEnabledFunctionSignature;
	ttl?: number;
	keys?: Array<string>;
	lock?: {
		enabled?: boolean;
		staleTime?: number;
	};
}
// #endregion

export type ActionHandler<T = any> = ((ctx: Context<any, any>) => Promise<T> | T) & ThisType<Service>;

// #region Params
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
	| Record<string, any>;
export type ActionParams = { [key: string]: ActionParamTypes };
// #endregion

// #region Hooks
export type ActionHookBefore = (ctx: Context<any, any>) => Promise<void> | void;
export type ActionHookAfter = (ctx: Context<any, any>, res: any) => Promise<any> | any;
export type ActionHookError = (ctx: Context<any, any>, err: Error) => Promise<void> | void;

export interface ActionHooks {
	before?: string | ActionHookBefore | Array<string | ActionHookBefore>;
	after?: string | ActionHookAfter | Array<string | ActionHookAfter>;
	error?: string | ActionHookError | Array<string | ActionHookError>;
}
// #endregion

export type ActionVisibility = "published" | "public" | "protected" | "private";

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

export type ServiceAction = (<T = Promise<any>, P extends Record<string, any> = Record<string, any>>(params?: P, opts?: CallingOptions) => T) & ThisType<Service>;
export interface ServiceActions {
	[name: string]: ServiceAction;
}

export interface ServiceDependency {
	name: string;
	version?: string | number;
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

export interface ServiceSettingSchema {
	$noVersionPrefix?: boolean;
	$noServiceNamePrefix?: boolean;
	$dependencyTimeout?: number;
	$shutdownTimeout?: number;
	$secureSettings?: Array<string>;
	[name: string]: any;
}

export interface ServiceSchema<S extends ServiceSettingSchema = ServiceSettingSchema> {
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

declare class Service<S = ServiceSettingSchema> implements ServiceSchema {
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
	logger: Logger;
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
	waitForServices(serviceNames: string | Array<string> | Array<ServiceDependency>, timeout?: number, interval?: number, logger?: Logger): Promise<WaitForServicesResult>;

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
export default Service;
