import BaseMetric from "./base";

export interface HistogramMetricSnapshot {
	labels: Record<string, any>;
	count: number;
	sum: number;
	timestamp: number;

	buckets?: {
		[key: string]: number;
	};

	min?: number | null,
	mean?: number | null,
	variance?: number | null,
	stdDev?: number | null,
	max?: number | null,
	quantiles?: {
		[key: string]: number;
	}
}

declare class HistogramMetric extends BaseMetric {
	buckets: Array<number>;
	quantiles: Array<number>;
	maxAgeSeconds?: number;
	ageBuckets?: number;

	observe(value: number, labels?: Record<string, any>, timestamp?: number): void;
	generateSnapshot(): Array<HistogramMetricSnapshot>;

	static generateLinearBuckets(start: number, width: number, count: number): Array<number>;
	static generateExponentialBuckets(start: number, factor: number, count: number): Array<number>;
}
export default HistogramMetric;
