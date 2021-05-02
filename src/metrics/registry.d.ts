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

declare class MetricRegistry {
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
export default MetricRegistry;
