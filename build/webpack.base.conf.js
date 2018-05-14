const config = require('../config')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  //页面入口文件配置
  entry: {
    // index: './src/index.js',
    // index.ts: ["babel-polyfill", "./src/ts/main.ts"]
    index: ["babel-polyfill", "./src/js/main.js"]
  },
  //编译输出配置
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module:{
    //模块加载器
    rules:[
      {
        test:/\.js$/,
        // loaders:['babel-loader?presets[]=es2015'],
        loaders:['babel-loader'],
        exclude:/node_modules/
      },
      {
        test:/\.(css|sass|scss)$/,
        loaders:['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        include: [resolve('src')]
      }
    ]
  }
}