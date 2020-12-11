/* global process, __dirname */

const express = require("express");
const path = require("path");
const axios = require('axios');
const fs = require('fs');
const fsPromises = require('fs').promises;
const htmlParse = require('node-html-parser');
const APP_CONST = require('./config/constants');

let distPath = path.resolve(__dirname, "./dist");
let configPath = path.resolve(__dirname, "./config");

const app = express();

app.use(express.static(distPath));

app.get("/micro-frontends-config", async function (req, res) {
  let mfeRoutes
  var env_config = APP_CONST.APP_CONFIG.find(function (item) { return item.appEnv == process.env.APPENV.toLowerCase() })
  switch (process.env.APPENV.toLowerCase()) {
    case APP_CONST.APP_ENV_PROD.toLowerCase() :
    case APP_CONST.APP_ENV_DEV.toLowerCase() :
      mfeRoutes = await axios.get(env_config.mfeConfigPath)
      mfeRoutes = mfeRoutes.data
      break;
    case APP_CONST.APP_ENV_LOCAL.toLowerCase() :
    case APP_CONST.APP_ENV_LOCAL_MULTI.toLowerCase() :
      mfeRoutes = await fsPromises.readFile(path.join(configPath + env_config.mfeConfigPath))
      break;
    default :
      res.send({'error': { message: "Check application environment", code: 500 }})
      break;
  }
  res.send(mfeRoutes);
});

app.get("*", async function (req, res) {
  var env_config = APP_CONST.APP_CONFIG.find(function (item) { return item.appEnv == process.env.APPENV.toLowerCase() })
  if (!await fs.existsSync(distPath)){
    await fs.mkdirSync(distPath);
  }
  let mfeIndex
  switch (process.env.APPENV.toLowerCase()) {
    case APP_CONST.APP_ENV_PROD.toLowerCase() :
    case APP_CONST.APP_ENV_DEV.toLowerCase() :
    case APP_CONST.APP_ENV_LOCAL.toLowerCase() :
      mfeIndex = await fsPromises.readFile(path.join(distPath + env_config.mfeIndexPath))
      break;
    case APP_CONST.APP_ENV_LOCAL_MULTI.toLowerCase() :
      mfeIndex = await axios.get(env_config.mfeIndexPath)
      mfeIndex = mfeIndex.data
      break;
    default :
      res.send({'error': { message: "Check application environment", code: 500 }})
      break;
  }
  let mfeRoutes
  switch (process.env.APPENV.toLowerCase()) {
    case APP_CONST.APP_ENV_DEV.toLowerCase() :
    case APP_CONST.APP_ENV_PROD.toLowerCase() :
      mfeRoutes = await axios.get(env_config.mfeRoutesPath)
      mfeRoutes = mfeRoutes.data
      break;
    case APP_CONST.APP_ENV_LOCAL.toLowerCase() :
    case APP_CONST.APP_ENV_LOCAL_MULTI.toLowerCase() :
      mfeRoutes = await fsPromises.readFile(path.join(configPath + env_config.mfeRoutesPath))
      break;
    default :
      res.send({'error': { message: "Check application environment", code: 500 }})
      break;
  }
  let mfeIndexHtml = htmlParse.parse(mfeIndex)
  let singleSpaMain = mfeIndexHtml.querySelector('#single-spa-main')
  singleSpaMain.remove()
  let singleSpaRouter = mfeIndexHtml.querySelector('single-spa-router')
  singleSpaRouter.insertAdjacentHTML('beforeend', '<div id="single-spa-main"></div>')
  singleSpaMain = mfeIndexHtml.querySelector('#single-spa-main')
  singleSpaMain.insertAdjacentHTML('beforeend', mfeRoutes)

  await fsPromises.writeFile(path.join(distPath + "/index.html"), mfeIndexHtml.toString());
  res.sendFile(path.join(distPath + "/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`App is hosted on port ${PORT}.`); // eslint-disable-line no-console
