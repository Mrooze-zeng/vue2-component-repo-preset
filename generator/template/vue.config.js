const path = require("path");
const webpack = require("webpack");

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("main-entry")
      .test(/main\.js$/)
      .use("VueUsePackagesLoader")
      .loader(path.resolve(__dirname, "./build/vue-use-packages-loader.js"))
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
