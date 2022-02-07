const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'scripts/todo_list.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    //loaders

    //plugins
    plugins: [new HtmlWebpackPlugin({
        title: 'Bundled MyChecklist',
        filename: 'index.html',
        template: path.resolve(__dirname, 'index.html')
    })]

}