const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, "scripts/todo_list.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devServer: {
    static: "./dist",
    port: 5001,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Bundled MyChecklist",
      filename: "index.html",
      template: path.resolve(__dirname, "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "styles/*.css"),
          to: "styles/[name].css",
        },
      ],
    }),
    new webpack.EnvironmentPlugin({
        TODO_SERVER_URL: "http://localhost:3000"
      })
  ],
};
