import BaseCacher, { CacherOptions } from "./base";

export interface MemoryCacherOptions extends CacherOptions {
	clone?: boolean;
}

declare class Memory extends BaseCacher {
	constructor(opts?: MemoryCacherOptions);
	opts: MemoryCacherOptions;
}
export default Memory;
