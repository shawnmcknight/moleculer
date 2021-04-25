import BaseCacher, { CacherOptions } from "./base";

export interface MemoryCacherOptions extends CacherOptions {
	clone?: boolean;
}

declare class MemoryCacher extends BaseCacher {
	constructor(opts?: MemoryCacherOptions);
	opts: MemoryCacherOptions;
}
export default MemoryCacher;
