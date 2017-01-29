const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");

//const parts = require("./webpack.parts");

const PATHS = {
  app: path.resolve(__dirname, './src/index.jsx'),
  build: path.resolve(__dirname, 'static'),
};

const common = merge ([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },

    devServer: {
      inline: true,
      port: 8080,
      headers: {
        "X-Custom-Foo": "bar"
      }
    },
    resolve: {
      extensions: ["", ".js",".jsx"],
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',	
          query: {
            presets: ['es2015', 'react']
          }
        },
        { test: /\.html$/, loader: "html-loader" },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template/index.html",
        title: 't3plyr',
        filename:"../index.html",
        inject: "body"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
     
  }
]);

module.exports = common;