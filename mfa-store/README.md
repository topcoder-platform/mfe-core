# TC MFA-STORE

This is a global store streaming implementation/library base for Topcoder micro-frontend applications. Made with rxjs.

Application has an store manager and global root store implementations for micro-frontend architecture.

## Build 

```
npm run build
```

## Deploy

```
npm pack
```

## Usage

### Root App or Nav App

Initialize store manager in application that always active. see in action => `https://github.com/topcoder-platform/micro-frontends-navbar-app/tree/dev/src/global-store.js` 

```ts

import {MfContext, StoreManager} from 'tc-mfa-store';

const storeManager = new StoreManager();
storeManager.initGlobalStore();
const mfContext = new MfContext();
mfContext.integrateStoreManager(storeManager);

```

### Micro-App

Access StoreManager with `MfContext` class and use it to access and subscribe to latest state changes.

```js

import {MfContext, CounterStore} from 'tc-mfa-store';

const mfContext = new MfContext();
const storeManager = mfContext.getStoreManager();
const counterStore = storeManager.getGlobalStore().counter;
// Get store value
counterStore.subscribe((counterState) => {
    // Do what you need with global counter state
});
// Set store value
counterStore.setCounter(2);
```

