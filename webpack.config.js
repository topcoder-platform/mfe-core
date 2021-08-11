/* global process */
const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (webpackConfigEnv) => {
  const orgName = "topcoder";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "micro-frontends-frame",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      host: "local.topcoder-dev.com",
      port: 8080,
      proxy: {
        "*": {
          target: "http://local.topcoder-dev.com:3000/",
          secure: false,
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          APPENV: webpackConfigEnv.APPENV,
          SEGMENT_ANALYTICS_KEY: webpackConfigEnv.SEGMENT_ANALYTICS_KEY,
          orgName,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/reuse",
            to: "./",
          },
          {
            from: "src/images",
            to: "./",
          },
        ],
      }),
    ],
  });
};
