/**
 * Created by aresn on 16/7/5.
 */
const path=require('path');
var webpack = require('webpack');
var config = require('./webpack.base.config');
const uglify = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

// config.output.publicPath = 'https://file.iviewui.com/dist/';
// config.output.publicPath = 'https://icarusion.gitee.io/iview/';
// config.output.publicPath = '/dist/';

function  assetsPath (_path) {
    return path.posix.join('static/', _path)
  }

  function  chunkPath (_path) {
    return path.posix.join('chunk/', _path)
  }


config.output.filename = assetsPath('js/[name].[chunkhash:8].js');                 // 带hash值的入口js名称
config.output.chunkFilename =chunkPath('[name].[hash].chunk.js');      // 带hash值的路由js名称  '[name].[hash].chunk.js'


config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin({
        filename: '[name].[hash].css',  //'[name].[hash].css'
        disable: false,
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.[hash].js'   //'vendors.[hash].js'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new uglify(),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/template/index.ejs',
        inject: false,
        favicon:'./src/images/logo.ico'
    })
]);

// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "production";';
    // fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
  fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
});

module.exports = config;
