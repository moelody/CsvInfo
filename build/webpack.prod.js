const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const TerserPlugin = require('terser-webpack-plugin')
const WebpackUnicodePlugin = require('./webpackUnicodePlugin')

let prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        parallel: 4,
        terserOptions: {
          compress: false,
          // {
          //   conditionals: false
          // },
          output: {
            comments: false
          },
          keep_classnames: true,
          keep_fnames: true
        }
      }),
      new WebpackUnicodePlugin()
    ]
  }
}

module.exports = merge(common, prodConfig)
