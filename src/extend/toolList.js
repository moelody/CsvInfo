const { ex } = require('src/singleton')
const { loc } = ex
/** ***********************资源功能************************************************** **/
const utils = require('src/ui/UtilsUI')
const { ICONS } = require('src/icon')
const { key } = require('src/key')
const SettingUI = require('src/ui/SettingUI')
const settingWindow = require('src/ui/settingWindow')

/** **********************************界面的一些刷新功能***************************************/
ex.extend({
  /** ***********************功能栏************************************************** **/
  sheetToArray(sheetText) {
    var b = sheetText.split('\n')
    b.forEach(function(item, i) {
      b[i] = item.split(',')
    })
    return b
  },
  toSnap(time) {
    var frameDuration = ex.comp.frameDuration
    var halfFrameDuration = frameDuration / 2
    var frameOffset = time % frameDuration
    if (frameOffset > 0.0001) {
      // Hopefully enough slop needed for "exact" frame values
      if (frameOffset < halfFrameDuration) time -= frameOffset
      else time += frameDuration - frameOffset
    }
    return time
  },
  toFrame(second) {
    return parseInt(ex.comp.frameRate * second)
  },
  toSecond(frame) {
    return ex.comp.frameDuration * frame
  },
  /** ***********************设置栏************************************************** **/
  setCsvInfo() {
    var winOps = SettingUI({
      settingName: loc(ex.setCsvInfoStr)
    })
    var win = winOps.window
    var csv = ex.csvInfo

    for (var i in csv) {
      if (typeof csv[i] !== 'function' && i !== 'id') {
        utils.add(win, {
          id: i + 'Grp',
          type: 'group',
          orientation: 'row',
          spacing: 0,
          alignment: ['fill', 'top']
        })
      }
    }

    var g = win.children
    for (var i = 0; i < g.length; i++) ex.addEditBtn(g[i], csv)

    winOps.open()
  },

  /** ***********************工具栏************************************************** **/
  addTimeRemap() {
    var comp = (ex.comp = app.project.activeItem)
    if (!(comp instanceof CompItem)) return alert(loc(ex.needComp))
    var layer = comp.selectedLayers[0]
    if (!layer) return alert(loc(ex.needLayer))
    if (!layer.canSetTimeRemapEnabled) return alert(loc(ex.needLayer))

    app.beginUndoGroup(loc(ex.addKeyStr))
    try {
      var csv = File.openDialog('选择CSV表格', 'CSV表格: *.csv') // File('/f/AE/project/YF/Script/Convert/time.csv')
      if (csv == null) return alert(loc(ex.findErr) + 'csvInfo')

      var csvArray = ex.sheetToArray(csv.readd())
      var titleArray = csvArray.shift()

      var ii = titleArray.indexOf(ex.csvInfo.csvIndex)
      var fi = titleArray.indexOf(ex.csvInfo.csvTime)
      if (!~ii) return alert(loc(ex.findErr) + ex.csvInfo.csvIndex)
      if (!~fi) return alert(loc(ex.findErr) + ex.csvInfo.csvTime)

      ex.progress.loading()
      var tmp = layer.timeRemap
      layer.timeRemapEnabled = false
      layer.timeRemapEnabled = true
      tmp.removeKey(2)
      tmp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.HOLD)
      csvArray.forEach(function(item, index) {
        if (!item[ii] || !item[fi]) return
        var si = ex.toSecond(item[fi]) + tmp.keyTime(index + 1)
        tmp.setValueAtTime(ex.toSnap(si), ex.toSecond(item[ii]))
        tmp.setInterpolationTypeAtKey(index + 2, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.HOLD)
      })
    } catch (err) {
      alert('Line #' + err.line.toString() + '\r\n' + err.toString())
    }
    ex.progress.close()
    app.endUndoGroup()
  }
})
