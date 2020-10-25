# Topcoder Frame Single-Spa Application (micro-frontends-frame)

This is the micro-frontends-frame [single-spa](https://single-spa.js.org/) application which loads all other Topcoder micro applications.
It always loads **Topcoder Navbar Microapp** which show the top navigation and handles authorization and loads other microapps depend on the current URL.

## Overview

Topcoder Single Spa consist of 3 main components:

- This frame application which is `micro-frontends-frame` [single-spa](https://single-spa.js.org/) application. The only function of this application is to register other micro applications to load.
- **Topcoder Navbar Microapp** - micro application which is always loaded by the frame application and shows top navigation bar and handles user authorization.
- Any other micro application can be loaded as main content of the overall application.

## Requirements

- node - v10.22.1
- npm - v6.14.6

## Config

This `micro-frontends-frame` app configs 2 things:

1. URLs to all microapps it can load inside

   - edit `src/public/importmap-production.json` to configure microapp names and URL to be used when deployed to production
   - edit `src/public/importmap-local.json` to configure microapp names and URL to be used when deployed to locally

2. Mapping between URL path and microapp to load by that path in `src/index.ejs`.

   To set `<MICRO_APP_NAME>` to be loaded on `<RELATIVE_URL_PATH>` URL path, add:

   ```html
   <route path="<RELATIVE_URL_PATH>">
     <application name="<MICRO_APP_NAME>"></application>
   </route>
   ```

## NPM Commands

| Command          | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `npm start`      | Run server which serves production ready build from `dist` folder |
| `npm run dev`    | Run app in the development mode                                   |
| `npm run build`  | Build app for production and puts files to the `dist` folder      |
| `npm run lint`   | Check code for lint errors                                        |
| `npm run format` | Format code using prettier                                        |
| `npm run test`   | Run unit tests                                                    |

## Local Deployment

To deploy `micro-frontends-frame` app locally run inside the project root:

- `npm i` to install dependencies
- `npm run dev` to start the app on port `3000`

Note, that to make authorization work locally, you have to use domain `local.topcoder-dev.com` with port `3000`. So you should add into your `/etc/hosts` the line `127.0.0.1 local.topcoder-dev.com` and open app by URL http://local.topcoder-dev.com:3000.

## Deployment to Production

- `npm i` - install dependencies
- `npm run build` - build code to `dist/` folder
- Now you can host `dist/` folder using any static server with fallback to `index.html` file for any not found route. For example, you may run a simple `Express` server by running `npm start`.

### Deploying to Heroku

Make sure you have [Heroky CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you have a Heroku account. And then inside the project folder run the next commands:

- If there is not Git repository inited yet, create a repo and commit all the files:
  - `git init`
  - `git add .`
  - `git commit -m'inital commit'`
- `heroku apps:create` - create Heroku app
- `git push heroku master` - push changes to Heroku and trigger deploying
- NOTE: Authorization would not work because only predefined list of domain allowed by `accounts-app`.

## Add/Remove child app

For adding a child app to the root app make the following steps:

1. Add child app path to importmap. User file `micro-frontends-frame/src/public/importmap-local.json` for local deployment and `micro-frontends-frame/src/public/importmap-production.json` for production:

   React example:

   ```js
   "@topcoder/micro-frontends-react-app": "//localhost:8500/topcoder-micro-frontends-react-app.js"
   ```

   Angular example:

   ```js
   "@topcoder/micro-frontends-angular-app": "//localhost:4200/topcoder-micro-frontends-angular-app.js"
   ```

2. Add a route which should show the app:

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
  Note, that if the frame is deployed using `HTTPS` protocol, then you have to run microapp locally using HTTPS protocol too. For example this could be done by `npm run dev-https` command in the **Topcoder Navbar Microapp**. Also, you would have to open the local app using direct HTTPS link first to make sure that browser allows loading it.
- Now reload the page and you would see the microapp loaded into the frame from the local machine. You can update it locally and see changes in the frame which is deployed to the remote server.

See video [Javascript tutorial: local development with microfrontends, single-spa, and import maps](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU) as a part of the official documentation of Single Spa.

## Creating child apps (microapps)

⚠️ NOTE that once we configure React/Angular application be run as child application in Single SPA we cannot run it as standalone application anymore. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approch, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

### Create new or use existent Angular child app

Any existent Angular app could be configured to be used as child app, but exact way would depend on the Angular version, see [documentation](https://single-spa.js.org/docs/ecosystem-angular) for details. For the Angular >= 7 the next approach should work.

- If you don't have existent Angular app, create a new app using [Angular CLI](https://cli.angular.io/):

  ```sh
  ng new micro-frontends-angular-app --routing --prefix tc-ex
  ```

  ⚠️ Note that the `--prefix` is important so that when you have multiple angular applications their component selectors won't have the same names.

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

⚠️ Note, that you cannot see this Angular app a standalone app anymore, `npm start` would not work.

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

⚠️ Note, that you cannot see this React app a standalone app.

### Use existent React child app

There is no universal approach to run any React app as child app in Single SPA. This is because unlike Angular application which always use Angular CLI, each React application has it's own Webpack config. And to be able to run React app as a child microapp we need the Webpack to be configured in a certain way.

- Here is Official Video form the creator of Single Spa on [How To Convert a create-react-app (CRA) project to single-spa](https://www.youtube.com/watch?v=W8oaySHuj3Y&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU)
