const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    index: "./generator/generator.js",
  },
  output: {
    path: path.resolve(__dirname, "generator"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
};
