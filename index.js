var refresh = function(global) {
  /** ***********************第三方库************************************************** **/
  require('lib/JSON')

  /** ***********************依赖对象************************************************** **/
  const { ex } = require('src/singleton')
  require('src/polyfill')
  require('src/extend')

  /** ***********************绑定函数************************************************** **/
  const settingWindow = require('src/ui/settingWindow')
  const progressBar = require('src/ui/progressBar')
  const BuildUI = require('src/ui/BuildUI')
  const utils = require('src/ui/UtilsUI')
  const { ICONS } = require('src/icon')

  var winOps = (ex.winOps = BuildUI({
    scriptName: ex.scriptName,
    version: ex.version
  }))
  var win = (ex.win = global instanceof Panel ? global : winOps.window)
  win.margins = 3
  win.onResize = win.onResizing = function() {
    var gr = ex.panel
    var lo = ex.layout
    win.margins = lo.winMargins[0]
    gr.size = win.size
    var numWidth = Math.floor(gr.size[0] / lo.itemSize[0])
    if (numWidth == 0) numWidth = 1
    for (var i = 0; i < gr.children.length; i++) {
      gr.children[i].size = lo.itemSize
      gr.children[i].location = [lo.itemSpacing[0] + (i % numWidth) * (lo.itemSize[0] + lo.itemSpacing[0]), lo.itemSpacing[1] + Math.floor(i / numWidth) * (lo.itemSize[1] + lo.itemSpacing[1])]
    }
    var distance = gr.children[gr.children.length - 1].location[1] + lo.itemSize[1] + lo.itemSpacing[1] - gr.size[1]
    if (distance > 0) {
      scrollbar.size[0] = 16
      scrollbar.size[1] = gr.size[1]
      scrollbar.location[0] = gr.size[0] - scrollbar.size[0]
      scrollbar.location[1] = gr.location[1]
      scrollbar.visible = 1
      for (var i = 0; i < gr.children.length; i++) {
        gr.children[i].location[1] = gr.children[i].location[1] - (scrollbar.value / 100) * (distance + lo.itemSize[1] + lo.itemSpacing[1])
      }
    } else {
      scrollbar.visible = 0
      scrollbar.size = [0, 0]
    }
  }
  var progress = (ex.progress = progressBar())

  /** ***********************工具栏************************************************** **/
  var panel = (ex.panel = win.add('Group{margins:0}')) // {orientation:'column',alignment:['fill','fill'],spacing:0,margins:0}
  var scrollbar = (ex.scrollbar = ex.addScrollBar.call(win))

  /** ***********************工具栏1************************************************** **/
  var btn1 = (ex.btn1 = ex.addCustomView.call(panel, {
    id: 'iconbutton',
    image: ICONS.btn1,
    helpTip: ex.loc(ex.btn1Tip),
    alignment: ['left', 'top'],
    properties: {
      style: 'toolbutton'
    }
  }))
  btn1.addEventListener('mousedown', function(event) {
    this.active = true
    this.active = false
    if (event.button === 0) {
      ex.addTimeRemap()
    }
    if (event.button === 2) {
      ex.setCsvInfo()
    }
    app.activeViewer.setActive()
  })

  /** ***********************工具栏2************************************************** **/

  /** ***********************工具栏3************************************************** **/

  /** ***********************设置栏************************************************** **/
  // var setBtn = ex.addToolBtn.call(panel, {
  //   id: 'settings',
  //   images: SETTINGS,
  //   frame: 0,
  //   size: [40, 40],
  //   alignment: ['left', 'top']
  // })
  var setBtn = ex.addCustomView.call(panel, {
    id: 'iconbutton',
    image: ICONS.settings,
    helpTip: ex.loc(ex.settingsTip),
    alignment: ['left', 'top'],
    properties: {
      style: 'toolbutton'
    }
  })
  setBtn.onClick = settingWindow

  winOps.open()

  if (ex.checkVersionOnStartupValue) {
    var checkVersionFunc = require('src/https/checkVersion')(
      win,
      /* true for starting */
      true
    )
    checkVersionFunc()
  }
  var observeSingleton = require('src/mvvm')
  observeSingleton(ex)

  app.onError &&
    app.onError(function(err) {
      alert(`警告, 脚本检测到AE报错, 内容如下:
  ${err.toString()}
  `)
    })
}
if (!(window instanceof Panel)) {
  $.global.callbackBeforeWebpackBuild = function() {
    try {
      var ex = $.global.yp[process.env.EX]
      ex.win && ex.win.close()
      ex.settingsWin && ex.settingsWin.close()
    } catch (e) {}
  }
  $.global.callbackBeforeWebpackBuild()
}
$.global[process.env.RE] = refresh
try {
  refresh(window)
} catch (err) {
  alert('Line #' + err.line.toString() + '\r\n' + err.toString())
}
