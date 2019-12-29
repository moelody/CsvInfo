var UtilsUI = (function() {
  var _ = this

  /** ***********************expand function************************************************** **/
  _.extend = function(target, source) {
    // give the source to target
    for (var i in source) target[i] = source[i]
    return target
  }

  /** ***********************functions for createUtils************************************************** **/
  _.add = function(parent, json) {
    // 为parent添加UI
    if (!json) return
    if (!parent) parent = this

    // create element
    var newUI
    var s = json.type
    if (json.properties) s += '{properties:' + JSON.stringify(json.properties) + '}'
    if (_.isWindow(json.type)) newUI = new Window(s)
    else newUI = parent.add(s)
    // add other properties for newElement
    for (var j in json) {
      if (j === 'type' || j === 'properties' || j === 'children') continue
      newUI[j] = json[j]
    }

    if (json.children) return arguments.callee(newUI, json.children)
    else return newUI
  }
  _.isWindow = function(type) {
    // 判断是否为window元素
    var winType = ['window', 'palette', 'dialog', 'Window', 'Palette', 'Dialog']
    var len = winType.length
    for (var i = 0; i < len; i++) {
      if (type === winType[i]) return true
    }
    return false
  }

  return _
})()
module.exports = $.global.yp.UtilsUI = UtilsUI
