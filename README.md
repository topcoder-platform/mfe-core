# Topcoder Frame Single-Spa Application (micro-frontends-frame)

This is the micro-frontends-frame [single-spa](https://single-spa.js.org/) application which loads all other Topcoder micro applications.
It always loads **Topcoder Navbar Microapp** which show the top navigation and handles authorization and loads other microapps depend on the current URL.

## Overview

Topcoder Single Spa consist of 3 main components:

- This frame application which is `micro-frontends-frame` [single-spa](https://single-spa.js.org/) application. The only function of this application is to register other micro applications to load.
- **Topcoder Navbar Microapp** - micro application which is always loaded by the frame application and shows top navigation bar and handles user authorization.
- Any other micro application can be loaded as main content of the overall application.

## Requirements

| Command              | Versions            |
| -------------------- | ---------------------- |
| `$ npm -v` | 6.14.6 |
| `$ node -v` | 0.33.11 |
| `$ nvm --version` | 0.33.11  |
| `$ nvm current` | v10.22.1 |

## Config

This `micro-frontends-frame` app has 2 types of configs:

1. Import mapping for the frame, containg `micro app name` and `relative url path` for each micro app. The configuration files are available on TC AWS S3 and have public access.

    i. What needs to be added for a new micro-app:
    ```json
    {
        "imports": {
            "@topcoder/micro-frontends-navbar-app": "https://mfe.topcoder-dev.com/navbar/topcoder-micro-frontends-navbar-app.js",
            "<MICRO_APP_NAME>": "<RELATIVE_URL_PATH>"
        }
    }
    ```

    ii. Location of the AWS S3 files:
    - Configure micro app names and relative URL to be used when deployed to production environment in file at location : `https://tc-platform-prod.s3.amazonaws.com/micro-frontends/micro-frontends-config-production.json`
    - Configure micro app names and relative URL to be used when deployed to development environment in file at location : `https://tc-platform-dev.s3.amazonaws.com/micro-frontends/micro-frontends-config-development.json`
    - Configure micro app names and relative URL to be used when deployed to local environment in file at location : `./micro-frontends-frame/config/micro-frontends-config-local.json`


2. Route mapping handled by the frame, containing `route path` and `micro app name` for each micro app. The configuration files are available on TC AWS S3 and have public access.

    i. What needs to be added for a new micro-app:
    ```html
    <route path="<RELATIVE_URL_PATH>">
        <application name="<MICRO_APP_NAME>"></application>
    </route>
    ```
    ii. Location of the AWS S3 files:
    - Configure route path and micro app name to be used when deployed to production environment in file at location : `https://tc-platform-prod.s3.amazonaws.com/micro-frontends/micro-frontends-routes-production.txt`
    - Configure route path and micro app name to be used when deployed to development environment in file at location : `https://tc-platform-dev.s3.amazonaws.com/micro-frontends/micro-frontends-routes-development.txt`
    - Configure route path and micro app name to be used when deployed to development environment in file at location : `./micro-frontends-frame/config/micro-frontends-routes-local.txt`

⚠️ **NOTE** : When a configuration files is updated on TC AWS S3, make sure to give public access to the file.

## NPM Commands

| Command              | Description            |
| -------------------- | ---------------------- |
| `npm start` | Run server which serves production ready build from `dist` folder |
| `npm run build` | Build app with webpack and puts files to the `dist` folder |
| `npm run local-server` | Run the server on local machine with nodemon |
| `npm run local-client` | Run the frontend on local machine with webpack-dev-server |
| `npm run lint` | Check code for lint errors |
| `npm run format` | Format code using prettier |
| `npm run test` | Run unit tests |

## Local Deployment from multi web servers (nodemon & webpack-dev-server) for local development

To deploy `micro-frontends-frame` app locally run inside the project root `./micro-frontends-frame`:

| Command              | Description            |
| -------------------- | ---------------------- |
| `$ export APPMODE="development"; export APPENV="local-multi"`  | to add environment variables for application building on local |
| `$ nvm use 10.22.1` | configure the required node and npm versions via nvm |
| `$ npm i` | to install dependencies |
| `$ npm run local-server` | to start the app on port `3000` |
| `$ export APPMODE="development"; export APPENV="local-multi"; nvm use 10.22.1; npm i; npm run local-client` | to start the app on port `8080` (`run in another terminal`) |
| `http://local.topcoder-dev.com:8080/micro-frontends-react-route` | open url in browser to access the micro frame with react micro app and micro navbar app |

⚠️ **NOTE** : for running locally, you have to use domain `local.topcoder-dev.com` with port `8080` & `3000`. On your local machine access file `/etc/hosts` add the line `127.0.0.1 local.topcoder-dev.com` and open app by URL http://local.topcoder-dev.com:8080

## Local Deployment from web server (node)

To deploy `micro-frontends-frame` app locally run inside the project root `./micro-frontends-frame`:

| Command              | Description            |
| -------------------- | ---------------------- |
| `$ export APPMODE="development"; export APPENV="local"`  | to add environment variables for application building on local |
| `$ nvm use 10.22.1` | configure the required node and npm versions via nvm |
| `$ npm i` | to install dependencies |
| `$ npm run build` | to build the application and store in `dist/` |
| `$ npm start` | to start the app on port `80`, served from `dist/` |
| `http://local.topcoder-dev.com:3000/micro-frontends-react-route` | open url in browser to access the micro frame with react micro app and micro navbar app |

⚠️ **NOTE** : that to make authorization work locally, you have to use domain `local.topcoder-dev.com` with port `3000`. On your local machine access file `/etc/hosts` add the line `127.0.0.1 local.topcoder-dev.com` and open app by URL http://local.topcoder-dev.com:3000

## Deployment to Development from web server (node) port 80

| Command              | Description            |
| -------------------- | ---------------------- |
| `$ export APPMODE="development"; export APPENV="dev"; export PORT=80`  | to add environment variables for application building on development |
| `$ nvm use 10.22.1` | to configure the required node and npm versions via nvm |
| `$ npm i` | to install dependencies |
| `$ npm run build` | to build the application and store in `dist/` |
| `$ npm start` | to start the app on port `80`, served from `dist/` |
| `https://mfe.topcoder-dev.com/micro-frontends-react-route` | open url in browser to access the micro frame with react micro app and micro navbar app |

## Deployment to Production from web server (node) port 80

| Command              | Description            |
| -------------------- | ---------------------- |
| `$ export APPMODE="production"; export APPENV="prod"; export PORT=80`  | to add environment variables for application building on production |
| `$ nvm use 10.22.1` | to configure the required node and npm versions via nvm |
| `$ npm i` | to install dependencies |
| `$ npm run build` | to build the application and store in `dist/` |
| `$ npm start` | to start the app on port `80`, served from `dist/` |
| `https://mfe.topcoder.com/micro-frontends-react-route` | open url in browser to access the micro frame with react micro app and micro navbar app |

### Deploying to Heroku

Make sure you have [Heroky CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you have a Heroku account. And then inside the project folder run the next commands:

- If there is not Git repository inited yet, create a repo and commit all the files:
  - `git init`
  - `git add .`
  - `git commit -m'inital commit'`
- `heroku apps:create` - create Heroku app
- `git push heroku master` - push changes to Heroku and trigger deploying
- ⚠️ **NOTE** : Authorization would not work because only predefined list of domain allowed by `accounts-app`.

## Segment Analytics

Because analytics can be normally initialized once per website, we are initializing Segment Analytics inside the Frame app instead of each child app separately. See [Segment Analytics Quick Guide](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/).

- Analytics requires `SEGMENT_ANALYTICS_KEY` to work.
- It should be set as environment variable `SEGMENT_ANALYTICS_KEY` during running `npm run build` (for production build) or  `npm run local-client` (for local development).
- If `SEGMENT_ANALYTICS_KEY` environment variable is not set during the build process, the Segment Analytics would not be initialized.
- Analytics would be exposed to the `window` object as `window.analytics`. See [Segment Analytics API Guide](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/).
- Note, that because we can build the Frame app without analytics initialized, all the child apps which use analytics should always check if it's initialized before usage, for example like this:
  ```js
  if (window.analytics && typeof window.analytics.page === "function") {
    window.analytics.page();
  }
  ```
- Each child app should take care about calling `window.analytics.page()` each time the page is changed. We can pass [additional arguments](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page) to this method if needed.
- We can enable debug mode by calling `analytics.debug();` inside browser console, see [debug documentation](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#debug).
- TODO: we might consider implementing one global logic for calling `window.analytics.page()` inside Frame of Navbar app so child apps wouldn't worry about this. Though we have to make sure that it works smoothly. In particular we have to make sure that if child app updates page `<title>` then `window.analytics.page()` is called after that and logs to the analytic correct page title. Also, child apps might want to provide additional arguments when calling `window.analytics.page()`. So we might come to this improvement in some time, after we try the current approach.

## Add/Remove child app

For adding a child app to the root app make the following steps:

1. Add child app path to importmap. File underpath
- `https://tc-platform-prod.s3.amazonaws.com/micro-frontends/micro-frontends-config-production.json` for production deployment
- `https://tc-platform-dev.s3.amazonaws.com/micro-frontends/micro-frontends-config-development.json` for development deployment
- `./micro-frontends-frame/config/micro-frontends-config-local.json` for local deployment

   React example:

   ```js
   "@topcoder/micro-frontends-react-app": "//localhost:8500/topcoder-micro-frontends-react-app.js"
   ```

   Angular example:

   ```js
   "@topcoder/micro-frontends-angular-app": "//localhost:4200/topcoder-micro-frontends-angular-app.js"
   ```

2. Add a route which should show the app. File underpath
- `https://tc-platform-prod.s3.amazonaws.com/micro-frontends/micro-frontends-routes-production.txt` for production deployment
- `https://tc-platform-dev.s3.amazonaws.com/micro-frontends/micro-frontends-routes-development.txt` for development deployment
- `./micro-frontends-frame/config/micro-frontends-routes-local.txt` for local deployment

   ```html
   <route path="<RELATIVE_URL_PATH>">
     <application name="<MICRO_APP_NAME>"></application>
   </route>
   ```

## Add-hoc child app replacement (import override)

To run a child app locally we always need to have frame (`micro-frontends-frame`) which would load a child app. But the cool thing is that we don't have to deploy the frame locally and we can use already deployed frame app. We can use a dev tool to override a child app URL so it would be loaded from the local machine by following the next steps:

- Load already deployed frame app in the browser.
- Open browser console and set `devtools` flag in the local storage by executing the next command:
  ```js
  localStorage.setItem("devtools", true);
  ```
- Reload the page, you would see the `{...}` icon in the bottom right corner.
- Clicking it would open **Import Map Overrides** tool where you can change the URL for any loaded microapp to the local URL.
  ⚠️ **NOTE** : that if the frame is deployed using `HTTPS` protocol, then you have to run microapp locally using HTTPS protocol too. For example this could be done by `npm run dev-https` command in the **Topcoder Navbar Microapp**. Also, you would have to open the local app using direct HTTPS link first to make sure that browser allows loading it.
- Now reload the page and you would see the microapp loaded into the frame from the local machine. You can update it locally and see changes in the frame which is deployed to the remote server.

See video [Javascript tutorial: local development with microfrontends, single-spa, and import maps](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU) as a part of the official documentation of Single Spa.

## Creating child apps (microapps)

f that once we configure React/Angular application be run as child application in Single SPA we cannot run it as standalone application anymore. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approch, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

### Create new or use existent Angular child app

Any existent Angular app could be configured to be used as child app, but exact way would depend on the Angular version, see [documentation](https://single-spa.js.org/docs/ecosystem-angular) for details. For the Angular >= 7 the next approach should work.

- If you don't have existent Angular app, create a new app using [Angular CLI](https://cli.angular.io/):

  ```sh
  ng new micro-frontends-angular-app --routing --prefix tc-ex
  ```

  ⚠️ **NOTE** : that the `--prefix` is important so that when you have multiple angular applications their component selectors won't have the same names.

- Now as we have Angular app, in the root of the application run the following command which would adapt Angular app so it could be run as a child app:

  ```sh
  ng add single-spa-angular
  ```

  Answer the following questions:

  - Does your application use Angular routing?: `Y` _(we've created the app using `--routing` flag, so yes)_
  - Does your application use BrowserAnimationsModule? `N` _(using browser animations might break re-rendering of the app and might require additional fixes)_

- Run `npm i` to install dependencies added by `ng add single-spa-angular`

- Now you must [configure routes](https://single-spa.js.org/docs/ecosystem-angular/#configure-routes). Update `src/app/app-routing.module.ts`:

  - Add 2 imports:

    ```js
    import { EmptyRouteComponent } from "./empty-route/empty-route.component";
    import { APP_BASE_HREF } from "@angular/common";
    ```

  - Add route to the `routes` array:

    ```js
    const routes: Routes = [
      // ... other routes here
      { path: "**", component: EmptyRouteComponent }, // add this line
    ];
    ```

  - Add provider to the `providers` array:

    ```js
    @NgModule({
      imports: [RouterModule.forRoot(routes)], // imports stay as it is
      exports: [RouterModule],  // exports stay as it is
      providers: [ // add providers array if it's not here
        // ... other providers here
        { provide: APP_BASE_HREF, useValue: '/' }, // add this line
      ],
    })
    ```

  - Add a declaration for `EmptyRouteComponent` in `app.module.ts`:

    ```js
    // add import for `EmptyRouteComponent`
    import { EmptyRouteComponent } from './empty-route/empty-route.component';

    ...

    declarations: [
      // ... other declarations here
      EmptyRouteComponent, // add this line
    ],
    ```

Now the new Angular app is ready to be run as child app. You can run it by `npm run serve:single-spa:micro-frontends-angular-app`. To see it in browser you have to config the root app to show it first, see "[Add/Remove child app](#addremove-child-app)" section.

The URL for the Angular app started this way would look like:

```
//localhost:4200/micro-frontends-angular-app.js
```

⚠️ **NOTE** : that you cannot see this Angular app a standalone app anymore, `npm start` would not work.

### Create new React child app

The easiest way to create a new React child app is using [create-single-spa](https://single-spa.js.org/docs/create-single-spa/) CLI tool.

Run `npx create-single-spa` and answer questions:

- Directory for new project: `micro-frontends-react-app`
- Select type to generate: `single-spa application / parcel`
- Which framework do you want to use?: `react`
- Which package manager do you want to use?: `npm`
- Will this project use Typescript?: `N`
- Organization name: `topcoder`
- Project name: `micro-frontends-react-app`

Now the new React app is created in the folder `micro-frontends-react-app`. You can run it by `npm start -- --port 8500`. To see it in browser you have to config the root app to show it first, see "[Add/Remove child app](#addremove-child-app)" section.

The URL for the React app started this way would look like:

```
//localhost:8500/topcoder-micro-frontends-react-app.js
```

⚠️ **NOTE** : that you cannot see this React app a standalone app.

### Use existent React child app

There is no universal approach to run any React app as child app in Single SPA. This is because unlike Angular application which always use Angular CLI, each React application has it's own Webpack config. And to be able to run React app as a child microapp we need the Webpack to be configured in a certain way.

- Here is Official Video form the creator of Single Spa on [How To Convert a create-react-app (CRA) project to single-spa](https://www.youtube.com/watch?v=W8oaySHuj3Y&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU)
