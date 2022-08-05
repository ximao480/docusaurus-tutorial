/**
 * Created by aresn on 16/7/5.
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 入口
  entry: {
    main: './src/main',
    vendors: ['vue', 'vue-router', '@syman/ark-ui', 'highlightjs/highlight.pack.js', 'clipboard']
  },
  // 输出
  output: {
    path: path.join(__dirname, './dist')
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                less: ExtractTextPlugin.extract({
                  use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                  fallback: 'vue-style-loader'
                }),
                css: ExtractTextPlugin.extract({
                  use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                  fallback: 'vue-style-loader'
                }),
              },
              postLoaders: {
                html: 'babel-loader'
              }
            }
          },
          // {
          //     loader: 'iview-loader',
          //     options: {
          //         prefix: false
          //     }
          // }
        ]
      },
      // {
      //     test: /iview\/.*?js$/,
      //     loader: 'babel-loader'
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  devServer: {
    //host:'localhost'
    proxy: [
      {
        context: '/p/cs',
        target: 'http://ark-api.ark.burgeononline.com/mock/736/',
        changeOrigin: true,
      },
      {
        context: '/search',
        target: 'https://www.npmjs.com/',
        changeOrigin: true,
      },
      {
        context: '/',
        target: 'https://registry.npmjs.org/',
        changeOrigin: true,
      },

    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'hljs': 'highlightjs/highlight.pack.js',
      'iCode': '../../components/code.vue',
      'vue$': 'vue/dist/vue.esm.js',
      // 'vue': 'vue/dist/vue.runtime.js'
      // '@': resolve('src')
    }
  },
  externals: {
    vue: 'Vue',
  },
};
