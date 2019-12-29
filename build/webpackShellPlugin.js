'use strict'

const exec = require('child_process').exec

function puts(error, stdout, stderr) {
  if (error) {
  }
  if (stdout) console.log(stdout)
}

class WebpackShellPlugin {
  constructor(options) {
    const defaultOptions = {
      onBuildEnd: []
    }

    this.options = Object.assign(defaultOptions, options)
  }

  apply(compiler) {
    const plugin = {
      name: this.constructor.name
    }
    const options = this.options
    compiler.hooks.emit.tapAsync(plugin, (compilation, callback) => {
      if (options.onBuildEnd.length) {
        options.onBuildEnd.forEach(script => exec(script, puts))
      } else if (typeof options.onBuildEnd === 'function') {
        options.onBuildEnd()
      }
      callback()
    })
  }
}

module.exports = WebpackShellPlugin
