process.env.NODE_ENV = 'production';

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack')
// 引入通用webpack配置文件
const common = require('./webpack.base.conf');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//清除输出目录，免得每次手动删除
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 对babel的配置，内容同.babelrc文件
const babelOptions = {
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
module.exports = merge(common, {
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }]},
  mode: process.env.NODE_ENV,
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env')
    }),
    new CleanWebpackPlugin(['dist']),
    // 对js代码进行混淆压缩的插件
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          dead_code: process.env.NODE_ENV === 'development' ? false : true , // 移除没被引用的代码
          drop_debugger: process.env.NODE_ENV === 'development' ? false : true, // 移除项目中的debugeer
          drop_console: process.env.NODE_ENV === 'development' ? false : true // 移除console.*的方法
        }
      }
    })
  ],
  // 设置出口文件地址与文件名
  output: {
    path: path.resolve('dist'),
    filename: 'fuiPlayer.min.js'
  },
});