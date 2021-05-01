export interface MetricReporterOptions {
	includes?: string | Array<string>;
	excludes?: string | Array<string>;

	metricNamePrefix?: string;
	metricNameSuffix?: string;

	metricNameFormatter?: (name: string) => string;
	labelNameFormatter?: (name: string) => string;

	[key: string]: any;
}

declare abstract class MetricBaseReporter {
	opts: MetricReporterOptions;

	constructor(opts: MetricReporterOptions);
	init(registry: MetricRegistry): void;

	matchMetricName(name: string): boolean;
	formatMetricName(name: string): string;
	formatLabelName(name: string): string;
	metricChanged(metric: BaseMetric, value: any, labels?: Record<string, any>, timestamp?: number): void;
}
export default MetricBaseReporter;
