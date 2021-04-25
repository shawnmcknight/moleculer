export interface CacherOptions {
	ttl?: number;
	keygen?: Function;
	maxParamsLength?: number;
	[key: string]: any;
}

declare class Base {
	constructor(opts?: CacherOptions);
	opts: CacherOptions;
	init(broker: ServiceBroker): void;
	close(): Promise<any>;
	get(key: string): Promise<Record<string, any> | null>;
	getWithTTL(key: string): Promise<Record<string, any> | null>;
	set(key: string, data: any, ttl?: number): Promise<any>;
	del(key: string|Array<string>): Promise<any>;
	clean(match?: string|Array<string>): Promise<any>;
	getCacheKey(actionName: string, params: object, meta: object, keys: Array<string> | null) : string;
	defaultKeygen(actionName: string, params: object | null, meta: object | null, keys: Array<string> | null): string;
}
export default Base;
