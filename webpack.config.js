const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: [__dirname + "/src/react_component/swmm_online.jsx", __dirname + "/styles/style.scss"],
    vendor: ["react", "react-dom", "redux", "react-redux", "konva", "react-konva"],
  },
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    inline: true
  },
  resolve: {
    extensions: [".ts", ".js", ".es6", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'sass-loader']
        })
      },
      {
        test: /.woff|.woff2|.svg|.eot|.ttf/,
        use: 'url-loader?prefix=font/&limit=10000'
      },
      {
        test: /\.es6$/,
        use: [
          {
            loader: "babel-loader",
            query: { presets: ["es2015", "stage-2"] }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.jsx/,
        use: [
          {
            loader: "babel-loader",
            query: { presets: ["es2015", "stage-2", "react"] }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.ts/,
        use: [
          { loader: "tslint-loader" }
        ]
      },
      {
        test: /\.ts/,
        use: [
          {
            loader: "awesome-typescript-loader",
            query: { silent: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "SWMM-Online",
      filename: "index.html",
      template: "./src/template.html",
      inject: "body",
      minify: {
          caseSensitive: false,
          collapseBooleanAttributes: true,
          collapseWhitespace: true
      },
      hash: false,
      cache: true,
      showErrors: true,
      chunksSortMode: "auto"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new ExtractTextPlugin("style.css")
  ]
};
