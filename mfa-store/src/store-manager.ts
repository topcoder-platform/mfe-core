
import { AuthStore } from './tc-stores/auth-store';
import { CounterStore } from './tc-stores/counter-store';

export interface IGlobalStore {
    counter: CounterStore;
    auth: AuthStore;
}

/**
 * Global store manager
 */
export class StoreManager {
    private globalStore: IGlobalStore;

    /**
     * Initializes global store (Should be called when root app bootstrapping)
     */
    public initGlobalStore() {
        this.globalStore = {
            auth: new AuthStore(),
            counter: new CounterStore(),
        }
    }

    /**
     * Get global store
     */
    public getGlobalStore() {
        if (!!this.globalStore) {
            return this.globalStore;
        }
        throw new Error("Global store is not initialized.");
    }

    /**
     * Get singe store instance
     * @param name store name (ex. 'counter')
     */
    public getStoreInstance(name: string) {
        const globalStore = this.getGlobalStore();
        if (globalStore.hasOwnProperty(name)) {
            return this.globalStore[name];
        }
        throw new Error(`Store instance with name ${name} is not exist.`);
    }

    /**
     * Add's custom store to global store
     * @param name store name
     * @param store store instance
     */
    public addStore<T>(name: string, store: T) {
        this.globalStore[name] = store;
    }
}