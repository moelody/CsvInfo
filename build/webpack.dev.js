const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const packages = require('../package.json')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const os = require('os')
const osascript = require('osascript').eval
const targetScript = path.join(__dirname, `../dist/${packages.name}.js`)
const WebpackShellPlugin = require('./webpackShellPlugin')

const plugins = [
  //new BundleAnalyzerPlugin(),
]

const ae = require('after-effects')
const isMac = os.platform() === 'darwin'
if (isMac) {
  const aeFolderName = path.basename(path.join(ae.scriptsDir, '../'))
  const appleScriptContent = `tell application "${aeFolderName}"
DoScriptFile "${targetScript}"
end tell`
  plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: function () {
        osascript(
          appleScriptContent, {
            type: 'AppleScript'
          },
          (err, data) => {
            if (err) console.error(err)
          }
        )
      }
    })
  )
} else {
  ae.options.program = path.join('C:\\Program Files\\Adobe', 'Adobe After Effects CC 2019')
  const afterfx = path.join(ae.scriptsDir, '../afterfx.exe')
  const shell = `"${afterfx}" -ro ${targetScript}`

  plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: [shell]
    })
  )
}

let devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
      use: ['file-loader']
    }]
  },
  plugins: plugins
}
module.exports = merge(common, devConfig)