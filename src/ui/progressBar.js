const { ex } = require('src/singleton')
const { loc } = ex
const { LOADING } = require('src/icon')

const utils = require('src/ui/UtilsUI')

var progressBar = (function() {
  function progressBar(options) {
    if (!(this instanceof progressBar)) {
      return new progressBar(options)
    }

    if (options && progressBar.isType(options, 'Object')) {
      for (var i in options) this.options[i] = options[i]
    }

    this.initWindow()
    return this
  }

  progressBar.isType = function(content, type) {
    return Object.prototype.toString.call(content) === '[object ' + type + ']'
  }
  progressBar.prototype.loading = function(win) {
    var stringToCall = `
    (function() {
        var ex = $.global.yp['${process.env.EX}']
        var win = ex.loadingWin
        var view = ex.loadingView
        var text = ex.loadingText
        if (!win.visible) {
          ex.loadingTask && app.cancelTask(ex.loadingTask)
          view.frame = 0
          return
        }
        view.onDraw = function() {
          var g = this.graphics
          var s = this.size
          var n = this.frame
          var LOADING = ex.LOADING
    
          g.drawImage(ScriptUI.newImage(LOADING['loading-' + n].fullName), 0, 0, s[0], s[1])
        }
        text.onDraw = function() {
          var g = this.graphics
          var s = this.size
          var f = ex.fontSet(this.font)
          var text = ex.loadingSet(ex.loc(this.lang))
    
          var font = (g.font = ScriptUI.newFont(f.fontFamily, f.fontStyle, f.fontSize)) // 字体样式
          var fontPen = g.newPen(g.PenType.SOLID_COLOR, f.fontColor, 0) // 字体颜色
          var gap = (s[0] - g.measureString(text, font)[0]) / 3 + 10
    
          /** ****绘制文字样式*** **/
          g.drawString(text, fontPen, f.fontPos[0] + gap, f.fontPos[1], font)
        }
        text.notify('onDraw')
        view.notify('onDraw')
        view.frame = ++view.frame % view.length
    })()
    `
    ex.loadingTask = app.scheduleTask(stringToCall, 10, true)
    this.open()
  }
  progressBar.prototype.close = function() {
    this.window && this.window.hide()
  }
  progressBar.prototype.open = function() {
    var win = this.window
    if (win instanceof Window) {
      win.layout.layout(false)
      win.center()
      win.show()
    } else {
      win.layout.layout(false)
    }
  }
  progressBar.prototype.initWindow = function() {
    var self = this
    var win = (ex.loadingWin = this.window = new Window('palette', loc(ex.progressBarStr), undefined, {
      borderless: true
    }))
    win.spacing = 0
    win.size = [280, 130]
    var view = (ex.loadingView = utils.add(win, {
      type: 'customButton',
      frame: 0,
      length: Object.keys(LOADING).length,
      alignment: ['center', 'center']
    }))
    view.size = [80, 80]
    var text = (ex.loadingText = utils.add(win, {
      type: 'customButton',
      size: [150, 30],
      lang: ex.progressStr,
      font: {
        fontFamily: '微软雅黑',
        fontStyle: 'BOLD',
        fontSize: 14,
        fontPos: [6, -7],
        fontColor: [0.8, 0.8, 0.8]
      },
      alignment: ['center', 'center']
    }))
  }
  return progressBar
})()
module.exports = $.global.yp.progressBar = progressBar
