import BaseMetric from "./base";

export interface GaugeMetricSnapshot {
	value: number;
	labels: Record<string, any>;
	timestamp: number;
}

declare class GaugeMetric extends BaseMetric {
	increment(labels?: Record<string, any>, value?: number, timestamp?: number): void;
	decrement(labels?: Record<string, any>, value?: number, timestamp?: number): void;
	set(value: number, labels?: Record<string, any>, timestamp?: number): void;
	generateSnapshot(): Array<GaugeMetricSnapshot>;
}
export default GaugeMetric;
