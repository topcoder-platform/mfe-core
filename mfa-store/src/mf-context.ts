import { StoreManager } from './store-manager';

/**
 * Global context of micro-frontends
 * ----
 * Use this service in micro-apps to access globalstore and subscribe events
 */

export class MfContext {

    /**
     * Sets store manager to be accessed by micro-apps.
     * @param storeMngr StoreManager to add
     */
    integrateStoreManager(storeMngr: StoreManager) {
        window['tc-global-store'] = storeMngr;
    }

    /**
     * Gets store manager
     */
    getStoreManager(): StoreManager {
        return window['tc-global-store'];
    }
}