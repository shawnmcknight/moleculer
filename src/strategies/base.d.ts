declare abstract class BaseStrategy {
	constructor(registry:ServiceRegistry, broker:ServiceBroker, opts?:object);
	select(list: any[], ctx?: Context): Endpoint;
}
export default BaseStrategy;
