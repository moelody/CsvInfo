var BuildUI = (function() {
  function BuildUI(options) {
    if (!(this instanceof BuildUI)) {
      return new BuildUI(options)
    }

    this.options = {
      windowType: 'palette', // "dialog","palette" and the reference of Panel
      scriptName: 'baseUI',
      version: '1.0',
      resizeable: true
    }

    if (options && BuildUI.isType(options, 'Object')) {
      for (var i in options) this.options[i] = options[i]
    }

    this.initSetting()
    this.initWindow()
    return this
  }

  BuildUI.isType = function(content, type) {
    return Object.prototype.toString.call(content) === '[object ' + type + ']'
  }
  BuildUI.prototype.open = function() {
    var win = this.window
    if (win instanceof Window) {
      win.show()
      win.onResize()
      this.refresh(win)
      if (this.haveSetting('Location')) {
        var location = this.getSetting('Location').split(',')
        win.location = [parseInt(location[0]), parseInt(location[1])]
      } else {
        win.center()
      }
      if (this.haveSetting('winSize')) {
        var size = this.getSetting('winSize').split(',')
        win.size = [parseInt(size[0]), parseInt(size[1])]
      }
    } else {
      this.refresh(win)
    }

    return win
  }
  BuildUI.prototype.refresh = function() {
    this.window.layout.layout(true)
  }
  BuildUI.prototype.initWindow = function() {
    var self = this
    this.window = new Window(this.options['windowType'], this.options['scriptName'] + ' v' + this.options['version'], undefined, {
      resizeable: this.options['resizeable']
    })
    this.window.onClose = function() {
      var thisStr = this.size[0].toString() + ',' + this.size[1].toString()
      self.saveSetting('winSize', thisStr)
      thisStr = this.location[0].toString() + ',' + this.location[1].toString()
      self.saveSetting('Location', thisStr)
    }
    this.window.onResize = this.window.onResizing = function() {
      this.layout.resize()
    }
  }
  BuildUI.prototype.initSetting = function() {
    this.slash = '/'
    var targetFolder = new Folder(Folder.userData.fullName + this.slash + 'Aescripts' + this.slash + this.options['scriptName'] + this.slash + this.options['version'])

    !targetFolder.exists && targetFolder.create()

    this.settingFile = new File(targetFolder.fullName + this.slash + 'ui_setting.xml')
    if (!this.settingFile.exists) {
      this.settingFile.open('w')
      this.settingFile.write('<setting></setting>')
      this.settingFile.close()
    }

    this.haveSetting = function(name) {
      this.settingFile.open('r')
      var content = this.settingFile.read()
      this.settingFile.close()
      return content.toString().indexOf('<' + name + '>') !== -1
    }

    this.getSetting = function(name) {
      this.settingFile.open('r')
      var xml = new XML(this.settingFile.read())
      this.settingFile.close()
      return xml[name].toString()
    }

    this.getSettingAsBool = function(name) {
      var result = this.getSetting(name)
      return result === 'true'
    }

    this.saveSetting = function(name, value) {
      this.settingFile.open('r')
      var xml = new XML(this.settingFile.read())
      this.settingFile.close()
      var isOk = true
      try {
        xml[name] = value.toString()
      } catch (err) {
        isOk = false
      }
      this.settingFile.open('w')
      this.settingFile.write(xml)
      this.settingFile.close()
      return isOk
    }
  }
  return BuildUI
})()
module.exports = $.global.yp.BuildUI = BuildUI
