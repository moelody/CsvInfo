class Root {
  constructor(options) {
    this.extend(options)
    return this
  }

  extend(source) {
    for (var i in source) this[i] = source[i]
    return this
  }

  isType(content, type) {
    return Object.prototype.toString.call(content) === '[object ' + type + ']'
  }

  haveSetting(keyName) {
    return app.settings.haveSetting(this.scriptName, keyName)
  }

  saveSetting(keyName, value) {
    app.settings.saveSetting(this.scriptName, keyName, value)
  }

  getSetting(keyName) {
    return app.settings.getSetting(this.scriptName, keyName)
  }

  getSettingAsBool(keyName) {
    return app.settings.getSetting(this.scriptName, keyName) === 'true'
  }
}
if (typeof $.global.yp !== 'object') {
  $.global.yp = {}
}
module.exports = $.global.yp.Root = Root
