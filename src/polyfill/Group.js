const { ex } = require('src/singleton')

module.exports = (function() {
  Group.prototype = {
    removeAll() {
      var len = this.children.length
      for (var i = 0; i < len; i++) this.remove(this.children[0])
    }
  }
})()
