const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: {
    main: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
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
    new MiniCssExtractPlugin(),
  ],
};
