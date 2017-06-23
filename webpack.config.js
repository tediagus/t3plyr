const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//const parts = require("./webpack.parts");

const PATHS = {
  app: path.resolve(__dirname, './src/index.jsx'),
  build: path.resolve(__dirname, 'static'),
};

const common = merge ([
  {
    entry: [
      //app: PATHS.app,
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
         PATHS.app
    ],
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/', 
      crossOriginLoading: "use-credentials"
    },
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, "static"),
      publicPath: "/",
      headers :{
         
      }
    },
    resolve: {
      modules: [
        path.join(__dirname,"src"),
        "node_modules"
      ],
      extensions: [".js",".jsx"],
    }, 
    module: {
      rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use : [
            'babel-loader'
          ]
        },
        { 
          test: /\.html$/, 
          use : [
             "html-loader" 
          ]
        },
        {
          test: /\.css$/,
          use : ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }, 
         {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template/index.html",
        title: 't3di-player',
        filename:"../static/index.html",
        inject: "body"
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("styles.css"),
      new webpack.DefinePlugin({
        "process.env.Node_ENV": JSON.stringify(process.env.Node_ENV)
      })
      ,new webpack.NamedModulesPlugin()
    ], 
    externals: {
      fs: {}
    },
    node: {
      net: "empty",
      tls: "empty"
    }
  }
]);

module.exports = common;