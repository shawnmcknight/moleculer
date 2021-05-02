declare class Registry {
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
export default Registry;
