process.env.NODE_ENV = 'development';

const webpack = require('webpack')
const path = require('path');
const config = require('../config');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入通用webpack配置文件
const common = require('./webpack.base.conf')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
module.exports = merge(common, {
  module: {
    rules:
      [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
      ]
  },
  mode: process.env.NODE_ENV,
  // 使用 source-map
  devtool: config.dev.devtool,
  // 对 webpack-dev-server 进行配置
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    // 设置localhost端口
    port: PORT || config.dev.port,
    publicPath: config.dev.assetsPublicPath,
    contentBase: false,
    // 自动打开浏览器
    open: config.dev.autoOpenBrowser,
    
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
});