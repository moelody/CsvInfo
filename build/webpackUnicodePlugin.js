'use strict'

var _webpackSources = require('webpack-sources')

function to_ascii(str, identifier) {
  return str.replace(/[\u0080-\uffff]/g, function(ch) {
    var code = ch.charCodeAt(0).toString(16)
    if (code.length <= 2 && !identifier) {
      while (code.length < 2) code = '0' + code
      return '\\x' + code
    } else {
      while (code.length < 4) code = '0' + code
      return '\\u' + code
    }
  })
}

class WebpackUnicodePlugin {
  constructor(options) {
    const defaultOptions = {}

    this.options = Object.assign(defaultOptions, options)
  }
  apply(compiler) {
    const options = this.options
    const plugin = {
      name: this.constructor.name
    }

    compiler.hooks.compilation.tap(plugin, compilation => {
      compilation.hooks.optimizeChunkAssets.tapAsync(plugin, (chunks, callback) => {
        chunks.forEach(chunk => {
          if (options.entryOnly && !chunk.isInitial()) return

          chunk.files.forEach(file => {
            return (compilation.assets[file] = new _webpackSources.RawSource(
              to_ascii(compilation.assets[file].source())
            ))
          })
          callback()
        })
      })
    })
  }
}

module.exports = WebpackUnicodePlugin
