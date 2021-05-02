declare class AsyncStorage {
	broker: ServiceBroker;
	store: Map<string, any>;

	constructor(broker: ServiceBroker);

	enable(): void;
	disable(): void;
	stop(): void;
	getAsyncId(): number;
	setSessionData(data: any): void;
	getSessionData(): any | null;
}
export default AsyncStorage;
