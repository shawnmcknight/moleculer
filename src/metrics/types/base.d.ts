import MetricRegistry from "../registry";

export interface BaseMetricOptions {
	type: string;
	name: string;
	description?: string;
	labelNames?: Array<string>;
	unit?: string;
	aggregator?: string;
	[key: string]: unknown;
}

export interface BaseMetricPOJO {
	type: string;
	name: string;
	description?: string;
	labelNames: Array<string>;
	unit?: string;
	values: Array<MetricSnapshot>;
}

declare abstract class BaseMetric {
	type: string;
	name: string;
	description?: string;
	labelNames: Array<string>;
	unit?: string;
	aggregator: string;

	lastSnapshot: Record<string, any> | null;
	dirty: boolean;
	values: Map<String, Record<string, any>>;

	constructor(opts: BaseMetricOptions, registry: MetricRegistry);
	setDirty(): void;
	clearDirty(): void;
	get(labels?: Record<string, any>): Record<string, any> | null;
	reset(labels?: Record<string, any>, timestamp?: number): Record<string, any> | null;
	resetAll(timestamp?: number): Record<string, any> | null;
	clear(): void;
	hashingLabels(labels?: Record<string, any>): string;
	snapshot(): Array<MetricSnapshot>;
	generateSnapshot(): Array<MetricSnapshot>;
	changed(value: any | null, labels?: Record<string, any>, timestamp?: number): void;
	toObject(): BaseMetricPOJO;
}
export default BaseMetric;
