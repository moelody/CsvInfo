const { ex } = require('src/singleton')
const { font } = ex
module.exports = (function() {
  // var keyNameArr = []
  // var valueArr = []

  // keyNameArr.pushh('lang')

  // valueArr.pushh('ch')

  // keyNameArr.forEach(function(item, index) {
  //   var value = valueArr[index]
  //   if (ex.haveSetting(item) === false) ex.saveSetting(item, value)
  // })

  ex.extend({
    doPreset(preset, e) {
      for (var i in preset) {
        if (typeof preset[i] !== 'function') {
          if (ex.isType(preset[i], 'Object')) {
            e[i] = {
              id: i
            }
            ex.doPreset(preset[i], e[i])
          } else {
            e[i] = preset[i]
            if (ex.haveSetting(i)) {
              var str = ex.getSetting(i)
              if (ex.isType(e[i], 'String')) e[i] = str
              if (ex.isType(e[i], 'Number')) e[i] = Number(str)
              if (ex.isType(e[i], 'Boolean')) e[i] = str === 'true'
              if (ex.isType(e[i], 'Array'))
                str.split(',').forEach(function(item, index) {
                  if (ex.isType(e[i][index], 'Number')) e[i][index] = Number(item)
                  else if (ex.isType(e[i][index], 'Boolean')) e[i][index] = item === 'true'
                  else e[i][index] = item
                })
            } else ex.saveSetting(i, String(e[i]))
          }
        }
      }
    }
  })
  ex.doPreset(ex.preset, ex)

  ex.extend({
    loc(string) {
      var lang = ex.lang ? 'en' : 'ch'
      return string[lang]
    },
    versionUpdateInfo: {
      ch: `sheetcsv v${ex.version} yfsmallmoon@忆碗牛杂面

欢迎使用~~！

`,
      en: `sheetcsv v${ex.version} yfsmallmoon@ywnz
                    
Welcome to use~!
      
`
    }
  })

  if (ex.haveSetting('version') === false || ex.getSetting('version') < ex.version) {
    alert(ex.loc(ex.versionUpdateInfo))
  }
  ex.saveSetting('version', ex.version)
})()
