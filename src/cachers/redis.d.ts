import BaseCacher, { CacherOptions } from "./base";

export interface RedisCacherOptions extends CacherOptions {
	prefix?: string;
	redis?: Record<string, any>;
	redlock?: Record<string, any>;
	monitor?: boolean;
}

declare class RedisCacher<C = any> extends BaseCacher {
	constructor(opts?: string | RedisCacherOptions);
	opts: RedisCacherOptions;

	client: C;
	prefix: string | null;
}
export default RedisCacher;
