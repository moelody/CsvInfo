const mvvm = require('./observer')
const { ex } = require('src/singleton')

var nameBlackList = []

function watch(name, oldValue, newValue) {
  // $.writeln('name: ', name, ' oldValue: ', oldValue, ' newValue: ', newValue)
  if (typeof oldValue === 'function') {
    return oldValue
  } else if (typeof newValue === 'boolean') {
    var settingName = name.replace('Value', '')
    // $.writeln('write to ', settingName, ' has?: ', $.global.sp.haveSetting(name.replace('Value', '')))
    if (ex.haveSetting(settingName)) {
      ex.saveSetting(settingName, newValue)
      return newValue
    } else {
      return oldValue
    }
  } else {
    return newValue
  }
}

module.exports = function(obj) {
  return mvvm.observer(obj, watch, nameBlackList)
}
