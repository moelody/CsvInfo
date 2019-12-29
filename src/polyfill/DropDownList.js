const { ex } = require('src/singleton')
const { unit } = ex
const { quicklist } = ex

module.exports = (function() {
  DropDownList.prototype = {
    addQuickModify(id, btn, obj) {
      var drop = this
      var list = []
      if (ex.winOps.haveSetting(id)) {
        var data = ex.winOps.getSetting(id).split(',')
        if (color)
          for (var i = 0, len = data.length; i < len / 3; i++) {
            list[i] = data.splice(0, 3)
          }
        else list = data
      } else getListItem()
      addUnitItem()

      this.onChange = function() {
        var text = this.selection.text
        if (text === unit[id]) return
        if (text === 'Add' || text === 'Delete' || text === 'Reset') {
          text === 'Add' && !~list.indexOf(getNewItem()) && list.push(getNewItem())
          text === 'Delete' && ~list.indexOf(getNewItem()) && list.splice(list.indexOf(getNewItem()), 1)
          text === 'Reset' && list.removeAll() && getListItem()
          list.sort()
          ex.winOps.saveSetting(id, list)
          addUnitItem()
        } else {
          /** ***********************颜色按钮************************************************** **/
          if (btn.type === 'customButton') {
            text.split(',').forEach(function(item, index) {
              obj[btn.color][index] = Number(item)
            })
            btn.notify('onDraw')
            ex.saveSetting(id, String(obj[id]))
          }

          /** ***********************编辑按钮************************************************** **/
          if (btn.type === 'edittext') {
            btn.text = text
            btn.notify('onChange')
          }

          this.selection = 4
        }
      }
      function addUnitItem() {
        drop.removeAll()
        drop.add('item', 'Add')
        drop.add('item', 'Delete')
        drop.add('item', 'Reset')
        drop.add('separator', undefined)
        drop.add('item', unit[id])

        list.forEach(function(item, index) {
          drop.add('item', item)
        })
        drop.selection = 4
      }

      function getNewItem() {
        return btn.type === 'customButton' ? obj[btn.color] : btn.text
      }

      function getListItem() {
        quicklist[obj.id][id] &&
          quicklist[obj.id][id].forEach(function(item, index) {
            list.push(item)
          })
      }
    }
  }
})()
