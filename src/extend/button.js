const { ex } = require('src/singleton')
const { loc } = ex
const { font } = ex
/** ***********************资源功能************************************************** **/
const utils = require('src/ui/UtilsUI')
const { LOADING } = require('src/icon')
const { key } = require('src/key')
const ColorPicker = require('src/script/Ap_color')

/** **********************************界面的一些刷新功能***************************************/
ex.extend({
  /** ***********************自定义按钮栏************************************************** **/
  fontSet(options) {
    var font = JSON.parse(JSON.stringify(ex.font))
    if (options && ex.isType(options, 'Object')) {
      for (var i in options) {
        if (typeof options[i] !== 'function') {
          font[i] = options[i]
        }
      }
    }
    return font
  },
  loadingSet(text) {
    var n = 0
    var dot = loc(ex.dotStr)
    var frame = ex.loadingView.frame
    if (frame > 45) n = 3
    else if (frame > 30) n = 2
    else if (frame > 15) n = 1
    else n = 0
    n === 3 && (text = text + dot + dot + dot)
    n === 2 && (text = text + dot + dot)
    n === 1 && (text = text + dot)
    return text
  },
  addColorBtn(json) {
    var btn = this.add("customButton{text:'customButton',alignment:['fill','fill']}")
    Object.assign(btn, json)
    btn.onDraw = function() {
      var g = this.graphics
      var s = this.size
      var c = font[this.color]

      var color = g.newBrush(g.BrushType.SOLID_COLOR, c) // 背景颜色

      g.newPath()
      g.rectPath(2, 2, s[0] - 4, s[1] - 4)
      g.fillPath(color)
    }
    return btn
  },
  addCustomBtn(json) {
    var btn = this.add("customButton{text:'customButton',alignment:['fill','fill']}")
    Object.assign(btn, json)
    btn.onDraw = function() {
      var s = this.size
      var g = this.graphics
      var t = loc(this.lang)
      var f = ex.fontSet(this.font)

      var font = (g.font = ScriptUI.newFont(f.fontFamily, f.fontStyle, f.fontSize)) // 字体样式
      var fontPen = g.newPen(g.PenType.SOLID_COLOR, f.fontColor, 0) // 字体颜色
      var unfontPen = g.newPen(g.PenType.SOLID_COLOR, f.unfontColor, 0) // 未激活字体颜色
      var selectedFPen = g.newPen(g.PenType.SOLID_COLOR, f.selectedFColor, f.selectedFSize) // 边框颜色和大小
      var fontBGBrush = g.newBrush(g.BrushType.SOLID_COLOR, f.fontBGColor) // 背景颜色
      var activeBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.5, 0.5, 0.5]) // 背景颜色
      var gap = (s[0] - g.measureString(t, font)[0]) / 2 - (t.length + 4)

      /** ****绘制文字背景*** **/

      if (f.isShowBG) {
        g.newPath()
        g[f.fontBGShape + 'Path'](0, 0, s[0], s[1])
        this.active ? g.fillPath(activeBrush) : g.fillPath(fontBGBrush)
      }

      /** ****绘制文字样式*** **/
      var checked = this.checkedBtn && (this.checkedBtn.value === false || this.checkedBtn.visible === false)
      g.drawString(t, checked ? unfontPen : fontPen, f.fontPos[0] + (!!this.center ? gap : 0), f.fontPos[1], font)

      /** ****为被选中的item描边*** **/

      if (f.isShowStroke) {
        g.newPath()
        this.active && g.rectPath(0, 0, s[0], s[1])
        g.strokePath(selectedFPen)
      }
    }

    btn.addEventListener('mouseover', function(event) {
      this.active = true
    })
    btn.addEventListener('mouseout', function(event) {
      this.active = false
    })
    return btn
  },
  addCustomView(json) {
    var id = json.id
    var s = 'iconbutton'
    if (json.properties) s += '{properties:' + JSON.stringify(json.properties) + '}'
    var view = this.add(s)
    Object.assign(view, json)

    view.onDraw = function() {
      var g = this.graphics
      var s = this.size
      var i = this.image
      var is = ex.layout.itemSize

      var fontBGBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.1373, 0.1373, 0.1373]) // 背景颜色
      var activeBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.5, 0.5, 0.5]) // 背景颜色

      /** ****模仿toolbutton背景*** **/

      if (this.properties.style === 'toolbutton') {
        g.newPath()
        g['rectPath'](0, 0, s[0], s[1])
        this.active ? g.fillPath(activeBrush) : g.fillPath(fontBGBrush)
      }

      g.drawImage(i, (s[0] - is[0]) / 2, (s[1] - is[1]) / 2, is[0], is[1])
    }

    view.addEventListener('mouseover', function(event) {
      this.active = true
    })
    view.addEventListener('mouseout', function(event) {
      this.active = false
    })
    return view
  },
  addScrollBar() {
    var scrollbar = utils.add(this, {
      type: 'scrollbar',
      size: [0, 0],
      stepdelta: 20,
      jumpdelta: 20,
      alignment: ['right', 'top']
    })
    scrollbar.onChanging = function() {
      ex.win.onResize()
    }
    return scrollbar
  },

  /** ***********************合成按钮栏************************************************** **/
  addLabelBtn(e, sub, index) {
    var id = e.id.slice(0, -3)
    var btn = ex.addCustomBtn.call(e, {
      lang: ex[id + 'Str'],
      center: true,
      checkedBtn: sub.children[index]
    })
    btn.onClick = function() {
      ex.activeLab.notify('onDraw')
      var child = sub.children
      for (var i = 0, len = child.length; i < len; i++) child[i].visible = false
      child[index].visible = true
      ex.activeLab = this
    }
  },
  addEditBtn(e, obj) {
    var id = e.id.slice(0, -3)
    ex.addCustomBtn.call(e, {
      lang: ex[id + 'Str']
    })

    if (~id.indexOf('Color')) {
      var btn = ex.addColorBtn.call(e, {
        color: id,
        alignment: ['right', 'fill'],
        maximumSize: [80, 100]
      })
      btn.onClick = function() {
        var color = ColorPicker(obj[id]).rgb
        obj[id] = color
        btn.notify('onDraw')
        ex.saveSetting(id, String(obj[id]))
      }
    } else {
      var btn = utils.add(e, {
        type: "edittext{justify: 'center'}",
        text: obj[id],
        alignment: ['right', 'fill'],
        minimumSize: [80, 0],
        characters: 3
      })
      btn.onChange = function() {
        if (ex.isType(obj[id], 'String')) obj[id] = this.text
        if (ex.isType(obj[id], 'Number')) {
          var n = Number(this.text)
          if (n < 0 || isNaN(n)) this.text = obj[id]
          else obj[id] = n
        }
        if (ex.isType(obj[id], 'Array')) {
          var len = obj[id].length
          this.text.split(',').forEach(function(item, index) {
            var n = Number(item)
            if (!n || (len === 4 && (n > 1 || n < 0))) n = obj[id][index]
            else obj[id][index] = n
          })
          this.text = obj[id]
        }
        ex.saveSetting(id, String(obj[id]))
      }
    }

    var droplist = utils.add(e, {
      type: 'dropdownlist',
      itemSize: [40, 20],
      alignment: ['right', 'fill']
    })
    droplist.addQuickModify(id, btn, obj)
  },
  addSliderBtn(e, obj) {
    var id = e.id.slice(0, -3)
    var tBtn = ex.addCustomBtn.call(e, {
      lang: ex[id + 'Str']
    })

    var group = e.add("Group{orientation:'column',alignment:['fill','fill'],spacing:0,margins:0}")
    for (let i = 0, len = obj[id].length; i < len; i++) {
      let line = group.add("Group{orientation:'row',alignment:['fill','fill'],spacing:0,margins:0}")
      let slider = utils.add(line, {
        type: 'slider',
        value: obj[id][i],
        maximumSize: [1000, 23],
        alignment: ['fill', 'fill']
      })
      let btn = utils.add(line, {
        type: "edittext{justify: 'center'}",
        text: obj[id][i],
        alignment: ['right', 'fill'],
        minimumSize: [80, 0],
        characters: 3
      })
      slider.onChanging = function() {
        btn.text = parseInt(this.value)
        obj[id][i] = parseInt(this.value)
        ex.saveSetting(id, String(obj[id]))
        ex.win.onResize()
        if (id === 'winMargins') ex.winOps.refresh(ex.win)
      }
      btn.onChange = function() {
        var n = Number(this.text)
        if (n < 0 || isNaN(n)) this.text = obj[id][i]
        else obj[id][i] = n
        ex.saveSetting(id, String(obj[id]))
        slider.value = obj[id][i]
        ex.win.onResize()
        if (id === 'winMargins') ex.winOps.refresh(ex.win)
      }
      tBtn['font'] = {
        fontPos: font['fontPos'] + [0, i * 8]
      }
    }
  },
  addCheckboxBtn(e) {
    var id = e.id.slice(0, -3)
    var trimGrp = e.add('Group{margins:[0,6,0,0]}')
    var btn = utils.add(trimGrp, {
      type: 'checkbox',
      value: ex[id]
    })
    var edit = ex.addCustomBtn.call(e, {
      lang: ex[id + 'Str'],
      checkedBtn: btn
    })
    btn.onClick = function() {
      ex[id] = this.value
    }
    edit.onClick = function() {
      btn.notify('onClick')
    }
  }
})
