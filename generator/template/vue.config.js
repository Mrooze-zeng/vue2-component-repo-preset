const path = require("path");
const webpack = require("webpack");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/<%= projectName %>/" : "/",
  chainWebpack: (config) => {
    config.module
      .rule("main-entry")
      .test(/main\.js$/)
      .use("VueUsePackagesLoader")
      .loader("z-toolkit-v1/webpack/vue-use-packages-loader")
      .options({
        placeholder: "/* use-package-loader-inject */",
      })
      .end();
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _: "underscore",
      }),
    ],
  },
};
