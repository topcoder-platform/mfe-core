import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import "./reuse/global.css?modules=false";

const routes = constructRoutes(document.querySelector("#single-spa-layout"));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

System.import("@topcoder/micro-frontends-navbar-app").then(() => {
  // Activate the layout engine once navbar is loaded
  layoutEngine.activate();
  start();
});
