const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DisableEslintCheckPlugin = require("./disable-eslint-check-plugin");
const CreatePackagesExportsPlugin = require("./create-packages-exports-plugin");
const VueUsePackagesPlugin = require("./vue-use-packages-plugin");

module.exports = {
  mode: "production",
  stats: {
    all: false,
    hash: true,
    assets: true,
    version: true,
    timings: true,
    builtAt: true,
  },
  entry: {
    index: "./packages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../<%= projectName %>"),
    publicPath: "/<%= projectName %>/",
    library: "<%= projectName %>",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  optimization: {
    minimize: true,
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: "vendor",
    //         chunks: "all",
    //       },
    //     },
    //   },
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DisableEslintCheckPlugin(),
    new CreatePackagesExportsPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new VueUsePackagesPlugin({
      target: path.resolve(__dirname, "../src/main.js"),
      placeholder: "/* use-package-loader-inject */",
    }),
  ],
};
