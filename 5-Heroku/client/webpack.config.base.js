const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/todo_list.js"),
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
    proxy: {
      '/todos': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
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
  ],
};
