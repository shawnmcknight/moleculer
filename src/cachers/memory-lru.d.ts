import BaseCacher from "./base";
import { MemoryCacherOptions } from "./memory";

export interface MemoryLRUCacherOptions extends MemoryCacherOptions {
	max?: number;
}

declare class MemoryLRUCacher extends BaseCacher {
	constructor(opts?: MemoryLRUCacherOptions);
	opts: MemoryLRUCacherOptions;
}
export default MemoryLRUCacher;
