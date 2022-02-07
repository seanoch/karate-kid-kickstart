const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'scripts/todo_list.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 5001,
        open: true,
        hot: true
    },
    //loaders

    //plugins
    plugins: [new HtmlWebpackPlugin({
        title: 'Bundled MyChecklist',
        filename: 'index.html',
        template: path.resolve(__dirname, 'index.html')
    }), new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'styles/style.css'), 
          to: 'styles/style.css' },
          { from: path.resolve(__dirname, 'styles/md.css'), 
          to: 'styles/md.css' }
        ]
      })
    ]
}