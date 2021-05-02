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
export default Service;
