/*
 * 永远不要尝试修改这个文件，
 * 因为这个文件永远与git@github.com:Mrooze-zeng/vue2-component-repo-preset.git保持一致!!!!
 * 有新需求请提Issue.
 */

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
