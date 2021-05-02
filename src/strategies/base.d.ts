import Context from "../context";
import ServiceBroker from "../service-broker";
import Registry, { Endpoint } from "../registry";

declare abstract class BaseStrategy {
	constructor(registry: Registry, broker: ServiceBroker, opts?: object);
	select(list: any[], ctx?: Context): Endpoint;
}
export default BaseStrategy;
