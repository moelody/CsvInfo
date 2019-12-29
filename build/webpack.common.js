const path = require('path')
const webpack = require('webpack')
const packages = require('../package.json')
const exec = require('child_process').exec

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackWrapPlugin = require('./webpackWrapPlugin')

const plugins = [
  new webpack.DefinePlugin({
    'process.env.VERSION': JSON.stringify(packages.version),
    'process.env.RE': '"refreshSheetCSV"',
    'process.env.EX': '"csv"'
  }),
  new WebpackWrapPlugin({
    prefix: `/****/ (function(window) {`,
    suffix: '/****/ })(this)'
  }),
  // new webpack.BannerPlugin({
  //   banner: `  ${packages.name} ${packages.version}
  // author: ${packages.author}
  // ${packages.description}

  // repository: ${packages.homepage.replace('#readme', '')}
  // issues: ${packages.bugs.url}`
  // }),
  new CleanWebpackPlugin()
]

// const ae = require('after-effects')
// const targetScript = path.join(__dirname, '../src/icon/loading/convert.js')
// ae.options.program = path.join('C:\\Program Files\\Adobe', 'Adobe After Effects CC 2019')
// const afterfx = path.join(ae.scriptsDir, '../afterfx.exe')
// const shell = `"${afterfx}" -ro ${targetScript}`
// exec(shell, function puts(error, stdout, stderr) {
//   if (error) {}
//   if (stdout) console.log(stdout)
// })

module.exports = {
  entry: {
    sheetcsv: path.resolve(__dirname, '../index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, '../lib'),
      src: path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.jsx', '.txt'] // 默认值: [".js",".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
          // {
          //   loader: 'unicode-loader'
          // }
        ]
      }
    ]
  },
  plugins: plugins
}
