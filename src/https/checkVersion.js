const { ex } = require('src/singleton')
const { loc } = ex

const request = require('src/https')
module.exports = function(win, isStarting) {
  clearOutput && clearOutput()
  var targetAlert = isStarting ? writeLn : alert
  return function() {
    var latestVersion = ex.getVersion()
    var nowVersion = ex.version
    var compare = ex.compareSemver(latestVersion, nowVersion)
    if (compare > 0) {
      targetAlert(loc(ex.newVersionFind) + latestVersion.toString())
      var scriptLink = ex.downloadLinkPrefix + latestVersion + ex.downloadLinkSuffix
      if (confirm(loc(ex.shouldUpdateScript))) {
        try {
          var scriptString = request('GET', scriptLink, '')
          var file = new File($.fileName)
          file.writee(scriptString)
          targetAlert(loc(ex.downloaded))
          win.close()
          ex.win.close()
        } catch (err) {
          err.printa()
        }
      } else if (confirm(loc(ex.shouldDownloadScript))) {
        try {
          ex.openLink(scriptLink)
        } catch (err) {
          err.printa()
        }
      }
    } else if (compare === 0) {
      targetAlert(loc(ex.newVersionNotFind) + nowVersion.toString())
    } else if (compare < 0) {
      targetAlert(loc(ex.tryVersionFind) + nowVersion.toString())
    }
  }
}
