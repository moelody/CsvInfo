const createFiles = require('src/file/createFiles')
const { ex } = require('src/singleton')
const RIPPLE = require.context('./ripple', false, /\.txt$/)
const ripple = {}
RIPPLE.keys().forEach(function(item, index) {
  ripple['ripple-' + item.replace(/[^0-9]/gi, '')] = RIPPLE(item)
})
const RIPPLEFILE = createFiles(ripple, 'ripple')

module.exports = ex.RIPPLE = RIPPLEFILE
