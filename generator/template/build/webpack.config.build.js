const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DisableEslintCheckPlugin = require("z-toolkit-v1/webpack/disable-eslint-check-plugin");
const CreatePackagesExportsPlugin = require("z-toolkit-v1/webpack/create-packages-exports-plugin");
const VueUsePackagesPlugin = require("z-toolkit-v1/webpack/vue-use-packages-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  stats: {
    all: false,
    hash: true,
    assets: true,
    version: true,
    timings: true,
    builtAt: true,
    errors: true,
  },
  entry: {
    index: "./packages/index.js",
  },
  output: {
    path: path.resolve(process.cwd(), "cn-ui"),
    publicPath: "/cn-ui/",
    library: "cn-ui",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
        terserOptions: {
          compress: {
            passes: 2,
            toplevel: true,
            drop_console: true,
            booleans_as_integers: true,
            arguments: true,
          },
          mangle: {
            toplevel: true,
            // properties: true,
          },
        },
      }),
    ],
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
  externals: {
    _: "underscore",
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
      target: path.resolve(process.cwd(), "src/main.js"),
      placeholder: "/* use-package-loader-inject */",
    }),
  ],
};
