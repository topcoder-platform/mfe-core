# Topcoder Frame Single-Spa Application (mfe-core)

This is the mfe-core [single-spa](https://single-spa.js.org/) application which loads all other Topcoder micro-frontend (MFE) applications.
It always loads the **Topcoder Header Microapp** which provides the top-level navigation, handles authorization, and loads other microapps depending on the current URL.

## Overview

Topcoder Single Spa consist of 3 main components:

- This frame application, `mfe-core`, which is a [single-spa](https://single-spa.js.org/) application. The only function of this application is to register other micro applications to load.
- **Topcoder Header Microapp** - micro application which is always loaded by the frame application and shows the top-level navigation bar and handles user authorization.
- Any other micro application can be loaded as main content of the overall application.

## Requirements

Use the node version manager [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) to easily and safely manage the required version of NodeJS (aka, node). Download and install it per the instructions for your development operating system. Installing a version of node via `nvm` will also install `npm`.

Once nvm is installed, run: 
```
$ nvm install <insert node version>
```

>Note: the node version required at the time of this writing is `10.22.1`

At the root of the project directory you'll notice a file called `.nvmrc` which specifies the node version used by the project. The command `nvm use` will use the version specified in the file if no version is supplied on the command line. 
See [the nvm Github README](https://github.com/nvm-sh/nvm/blob/master/README.md#nvmrc) for more information on setting this up.

You can verify the versions of `nvm`, `node`, and `npm` using the commands below.
| Command           | Version  |
| ----------------- | -------- |
| `$ npm -v`        | 6.14.12  |
| `$ node -v`       | v10.22.1 |
| `$ nvm --version` | 0.39.1   |
| `$ nvm current`   | v10.22.1 |

## Local Development Setup

### IDE

Use the [VS Code](https://code.visualstudio.com/download) IDE for MFE development.

### Hosting 
You will need to add the following line to your hosts file. The hosts file is normally located at `/etc/hosts` (Mac). Do not overwrite the existing localhost entry also pointing to 127.0.0.1

```
127.0.0.1      local.topcoder-dev.com
```

The MFE can run in a non-ssl environment, but auth0 will complain and throw errors. In order to bypass this, you will need to install [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy) to run the site in ssl. The following command will install it globally:
```
$ npm i -g local-ssl-proxy
```

### Terminal Configuration

The MFE Core Frame needs to run separate local server and client processes, each one in a separate terminal session. The navbar also needs to run its server in a terminal, along with the `local-ssl-proxy` server that will allow you to use *https* endpoints locally. Finally, each of the other micro front-end applications you want to run will also each run in their own terminal session.

When developing one of the micro front-end applications you will therefore have 5 terminal sessions running at the same time:

- `mfe-core` server
- `mfe-core` client
- `mfe-header` application
- `local-ssl-proxy` server
- the MFE app you're developing 

Given this complexity, it is recommended that you use a tool like [iTerm2](https://iterm2.com) (on Mac) or an equivalent terminal shell on Windows to make terminal management simpler. iTerm2 allows you to setup a pre-defined window layout of terminal sessions, including the directory in which the session starts. This setup, along with simple shell scripts in each project that configure and start the environment, will allow you to get your development environment up and running quickly and easily.

### Linting
We use linting to enforce standardization. Please make sure all lint rules pass before creating PRs. 

Use the following command to check for lint errors:
```
$ npm run lint
``` 

## Git
### Branching
When working on Jira tickets, we link associated Git PRs and branches to the tickets. Use the following naming convention for branches:

`[TICKET #]_short-description`

e.g.: `PROD-1516_work-issue`

### Commits
We use [Smart Commits](https://bigbrassband.com/git-integration-for-jira/documentation/smart-commits.html#bbb-nav-basic-examples) to link comments and time tracking to tickets. You would enter the following as your commit message:

`[TICKET #] #comment <commit message> #time <jira-formatted time>`

e.g.: `PLAT-001 #comment adding readme notes #time 45m`


## Application Configuration

This `mfe-core` app has 2 types of configs:

1. Import mapping for the frame, containg `micro app name` and `relative url path` for each micro app. The configuration files are available on TC AWS S3 and have public access.

    i. What needs to be added for a new micro-app:
    ```json
    {
        "imports": {
            "@topcoder/mfe-header": "https://mfe.topcoder-dev.com/navbar/topcoder-mfe-header.js",
            "<MICRO_APP_NAME>": "<RELATIVE_URL_PATH>"
        }
    }
    ```

    ii. Location of the AWS S3 files:
    - Configure micro app names and relative URL to be used when deployed to production environment in file at location : `https://tc-platform-prod.s3.amazonaws.com/micro-frontends/micro-frontends-config-production.json`
    - Configure micro app names and relative URL to be used when deployed to development environment in file at location : `https://tc-platform-dev.s3.amazonaws.com/micro-frontends/micro-frontends-config-development.json`
    - Configure micro app names and relative URL to be used when deployed to local environment in file at location : `./mfe-core/config/micro-frontends-config-local.json`


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
    - Configure route path and micro app name to be used when deployed to development environment in file at location : `./mfe-core/config/micro-frontends-routes-local.txt`

⚠️ **NOTE** : When a configuration files is updated on TC AWS S3, make sure to give public access to the file.

## NPM Commands

| Command              | Description            |
| -------------------- | ---------------------- |
| `npm start` | Run server which serves production ready build from `dist` folder |
| `npm run start-server` | Run server locally for local development (calls on local-server npm script) |
| `npm run start-client` | Run client locally for local development (calls on local-client npm script) |
| `npm run build` | Build app with webpack and puts files to the `dist` folder |
| `npm run local-server` | Run the server on local machine with nodemon |
| `npm run local-client` | Run the frontend on local machine with webpack-dev-server |
| `npm run lint` | Check code for lint errors |
| `npm run format` | Format code using prettier |
| `npm run test` | Run unit tests |

## Local Deployment from multi web servers (nodemon & webpack-dev-server) for local development - (most common)

To run the `mfe-core` app locally, run the following commands from the project root `./mfe-core`:

Terminal 1
```
$ npm run start-server
```

Terminal 2
```
$ npm run start-client
```

## Local Deployment from web server (node)

To deploy `mfe-core` app locally run inside the project root `./mfe-core`:

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
- `./mfe-core/config/micro-frontends-config-local.json` for local deployment

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
- `./mfe-core/config/micro-frontends-routes-local.txt` for local deployment

   ```html
   <route path="<RELATIVE_URL_PATH>">
     <application name="<MICRO_APP_NAME>"></application>
   </route>
   ```

## Add-hoc child app replacement (import override)

To run a child app locally we always need to have frame (`mfe-core`) which would load a child app. But the cool thing is that we don't have to deploy the frame locally and we can use already deployed frame app. We can use a dev tool to override a child app URL so it would be loaded from the local machine by following the next steps:

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





### Checkout 4 repos and apply patches:
- git clone https://github.com/topcoder-platform/mfe-core.git
- git clone https://github.com/topcoder-platform/mfe-header.git
- git clone https://github.com/topcoder-platform/micro-frontends-react-app.git
- git clone https://github.com/topcoder-platform/micro-frontends-angular-app.git
and create a folder (ex: 'auth0-local-login'), and save the following file: 'https://accounts-auth0.topcoder-dev.com/setupAuth0WithRedirect.js' into that folder. After 'setupAuth0WithRedirect.js' file was saved, create an empty 'index.html' file with the following content:
```
<!DOCTYPE html>
<html>
<head>
    <title>Auth0</title>
    <meta charset="utf-8" />
    <script language="javascript" type="text/javascript" src="./setupAuth0WithRedirect.js"></script>
</head>
<body>
    Loaded...redirecting to auth0.(see browser console log)
    <script>
        window.onload = authSetup;
    </script>
    <a href="?retUrl=http://localhost:3000" >Login</a>
</body>
</html>
```
### Local deployment:
(1). root-config: 
open Terminal #1
change the current dir to the root-config folder and apply patch:
- cd mfe-core
- git apply ../mfe-core.diff --ignore-whitespace --whitespace=nowarn
install dependencies:
- npm install
build and run the app:
- APPMODE=development APPENV=local npm run build
- APPMODE=development APPENV=local npm run local-server
(2). navbar-app: 
open Terminal #2
change the current dir to the navbar-app folder and apply patch:
- cd mfe-header
- git apply ../mfe-header.diff --ignore-whitespace --whitespace=nowarn
there is a config file: '{navbar-app-repo}/config/development.js'. To login locally, change 'ACCOUNTS_APP_CONNECTOR', and 'AUTH' to point to the server that will be served in folder 'auth0-local-login' which was setup in the previous step.
```
URL: {
 ACCOUNTS_APP_CONNECTOR: "http://localhost:5000",
 AUTH: "http://localhost:5000"
 ...
}
```
install dependencies:
- npm install
build and run the app (choose 1 out of 3 ways listed bellow):
for development build with hot-reload:
- npm run dev
or 
for development build with static server:
- APPMODE=development npm run build
- npm start
or
for production build with static server:
- npm run build
- npm start
NOTE:
Default backend environment is always the dev environment. To switch to production environment, add APPENV=production before the command, ex:
- APPENV=production npm run dev
or
- APPENV=production npm run build
- npm start
(3). react-app:
open Terminal #3
change the current dir to the react-app folder and apply patch:
- cd micro-frontends-react-app
- git apply ../micro-frontends-react-app.diff --ignore-whitespace --whitespace=nowarn
install dependencies:
- npm install
build and run the app:
- npm run dev
(4). angular-app:
open Terminal #4
change the current dir to the angular-app folder and apply patch:
- cd micro-frontends-angular-app
- git apply ../micro-frontends-angular-app.diff --ignore-whitespace --whitespace=nowarn
install dependencies:
- npm install
build and run the app:
- npm run dev
(5). auth0 login in local mode
open Terminal #5
change the current dir to the 'auth0-local-login' folder and serve with the index.htm file
- cd auth0-local-login
- npx http-server . -p 5000
The app can be open at the browser url: 'http://localhost:5000' (this page will redirect to the actual page: 'http://localhost:3000')

## Local deployment - handle auth redirects

### Checkout 4 repos and apply patches:

- git clone https://github.com/topcoder-platform/mfe-core.git

- git clone https://github.com/topcoder-platform/mfe-header.git

- git clone https://github.com/topcoder-platform/micro-frontends-react-app.git

- git clone https://github.com/topcoder-platform/micro-frontends-angular-app.git

and create a folder (ex: 'auth0-local-login'), and save the following file: 'https://accounts-auth0.topcoder-dev.com/setupAuth0WithRedirect.js' into that folder. After 'setupAuth0WithRedirect.js' file was saved, create an empty 'index.html' file with the following content:

```

<!DOCTYPE html>

<html>

<head>

<title>Auth0</title>

<meta charset="utf-8" />

<script language="javascript" type="text/javascript" src="./setupAuth0WithRedirect.js"></script>

</head>

<body>

Loaded...redirecting to auth0.(see browser console log)

<script>

window.onload = authSetup;

</script>

<a href="?retUrl=http://localhost:3000" >Login</a>

</body>

</html>

```

### Local deployment:

(1). root-config:

open Terminal #1

change the current dir to the root-config folder and apply patch:

- cd mfe-core

- git apply ../mfe-core.diff --ignore-whitespace --whitespace=nowarn

install dependencies:

- npm install

build and run the app:

- APPMODE=development APPENV=local npm run build

- APPMODE=development APPENV=local npm run local-server

(2). navbar-app:

open Terminal #2

change the current dir to the navbar-app folder and apply patch:

- cd mfe-header

- git apply ../mfe-header.diff --ignore-whitespace --whitespace=nowarn

there is a config file: '{navbar-app-repo}/config/development.js'. To login locally, change 'ACCOUNTS_APP_CONNECTOR', and 'AUTH' to point to the server that will be served in folder 'auth0-local-login' which was setup in the previous step.

```

URL: {

ACCOUNTS_APP_CONNECTOR: "http://localhost:5000",

AUTH: "http://localhost:5000"

...

}

```

install dependencies:

- npm install

build and run the app (choose 1 out of 3 ways listed bellow):

for development build with hot-reload:

- npm run dev

or

for development build with static server:

- APPMODE=development npm run build

- npm start

or

for production build with static server:

- npm run build

- npm start

NOTE:

Default backend environment is always the dev environment. To switch to production environment, add APPENV=production before the command, ex:

- APPENV=production npm run dev

or

- APPENV=production npm run build

- npm start

(3). react-app:

open Terminal #3

change the current dir to the react-app folder and apply patch:

- cd micro-frontends-react-app

- git apply ../micro-frontends-react-app.diff --ignore-whitespace --whitespace=nowarn

install dependencies:

- npm install

build and run the app:

- npm run dev

(4). angular-app:

open Terminal #4

change the current dir to the angular-app folder and apply patch:

- cd micro-frontends-angular-app

- git apply ../micro-frontends-angular-app.diff --ignore-whitespace --whitespace=nowarn

install dependencies:

- npm install

build and run the app:

- npm run dev

(5). auth0 login in local mode

open Terminal #5

change the current dir to the 'auth0-local-login' folder and serve with the index.htm file

- cd auth0-local-login

- npx http-server . -p 5000

The app can be open at the browser url: 'http://localhost:5000' (this page will redirect to the actual page: 'http://localhost:3000')
