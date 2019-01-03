const HtmlWebPackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack"); //to access built-in plugins
const path = require("path");

//https://github.com/webpack/webpack-dev-server/issues/1422
//webpack-dev-server 目前只能用"webpack-cli"不能用"webpack-command"

module.exports = {
  entry: {
    PouchDB: "./src/PouchDB.js",
    localforage:"./src/localforage.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
          // {
          //     loader: 'eslint-loader',
          //     options: {
          //         // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          //         // formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
          //         fix: true
          //     }
          // }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
            // options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebPackPlugin({
      template: "static/PouchDB.html",
      filename: "PouchDB.html",
      chunks:["PouchDB"]
    }),
    new HtmlWebPackPlugin({
      template: "static/localforage.html",
      filename: "localforage.html",
      chunks:["localforage"]
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 8000,
    openPage:"PouchDB.html"
  },
  devtool: "source-map"
};
