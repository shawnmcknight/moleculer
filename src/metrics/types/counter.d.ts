import BaseMetric from "./base";
import { GaugeMetricSnapshot } from "./gauge";

declare class CounterMetric extends BaseMetric {
	increment(labels?: Record<string, any>, value?: number, timestamp?: number): void;
	set(value: number, labels?: Record<string, any>, timestamp?: number): void;
	generateSnapshot(): Array<GaugeMetricSnapshot>;
}
export default CounterMetric;
