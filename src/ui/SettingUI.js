var SettingUI = (function() {
  function SettingUI(options) {
    if (!(this instanceof SettingUI)) {
      return new SettingUI(options)
    }

    this.options = {
      windowType: 'palette', // "dialog","palette" and the reference of Panel
      settingName: 'advSetting',
      resizeable: false
    }

    if (options && SettingUI.isType(options, 'Object')) {
      for (var i in options) this.options[i] = options[i]
    }

    this.initWindow()
    return this
  }

  SettingUI.isType = function(content, type) {
    return Object.prototype.toString.call(content) === '[object ' + type + ']'
  }
  SettingUI.prototype.open = function() {
    var win = this.window
    if (win instanceof Window) {
      win.center()
      win.show()
      win.onResize()
      this.refresh()
    } else {
      this.refresh()
    }

    return win
  }
  SettingUI.prototype.refresh = function() {
    this.window.layout.layout(true)
  }
  SettingUI.prototype.initWindow = function() {
    var self = this
    this.window = new Window(this.options['windowType'], this.options['settingName'], undefined, {
      resizeable: this.options['resizeable']
    })
    this.window.onResize = this.window.onResizing = function() {
      this.layout.resize()
    }
  }
  return SettingUI
})()
module.exports = $.global.yp.SettingUI = SettingUI
