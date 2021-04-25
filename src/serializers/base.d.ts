declare abstract class BaseSerializer {
	constructor(opts?: any);
	init(broker: ServiceBroker): void;
	serialize(obj: Record<string, any>, type: string): Buffer;
	deserialize(buf: Buffer, type: string): Record<string, any>;
}
export default BaseSerializer;
