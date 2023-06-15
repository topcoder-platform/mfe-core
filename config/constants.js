module.exports = Object.freeze({
  APP_CONFIG: [
    {
      'appEnv': 'dev',
      'mfeConfigPath': '/config/micro-frontends-config-dev.json',
      'mfeIndexPath': '/index.html',
      'mfeRoutesPath': '/config/micro-frontends-routes-dev.txt'
    },
    {
      'appEnv': 'qa',
      'mfeConfigPath': '/config/micro-frontends-config-qa.json',
      'mfeIndexPath': '/index.html',
      'mfeRoutesPath': '/config/micro-frontends-routes-qa.txt'
    },    
    {
      'appEnv': 'prod',
      'mfeConfigPath': '/config/micro-frontends-config-prod.json',
      'mfeIndexPath': '/index.html',
      'mfeRoutesPath': '/config/micro-frontends-routes-prod.txt'
    },
    {
      'appEnv': 'local-multi',
      'mfeConfigPath': '/micro-frontends-config-local.json',
      'mfeIndexPath': 'http://localhost:8080/index.html',
      'mfeRoutesPath': '/micro-frontends-routes-local.txt'
    },
    {
      'appEnv': 'local',
      'mfeConfigPath': '/micro-frontends-config-local.json',
      'mfeIndexPath': '/index.html',
      'mfeRoutesPath': '/micro-frontends-routes-local.txt'
    }
  ],
  APP_ENV_DEV: "dev",
  APP_ENV_QA: "qa",  
  APP_ENV_PROD: "prod",
  APP_ENV_LOCAL_MULTI: "local-multi",
  APP_ENV_LOCAL: "local",
});
