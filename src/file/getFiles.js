var getFiles = (function() {
  function getFiles(format, folder) {
    if (getFiles[format]) return getFiles[format](folder)
    return getFiles.find(format, folder)
  }

  /** ***********************expand function************************************************** **/
  getFiles.prefs = function() {
    var appVersion = parseFloat(app.version).toFixed(1)
    var folderPath = getPrefsFolder(appVersion)
    var filter = getLookupFilter(appVersion)
    if (!Folder(folderPath).exists) {
      writeLn('Unable to find Prefs location:"' + folderPath)
      return null
    }
    var prefsFile = Folder(folderPath).getFiles(function(item) {
      if (item instanceof File && decodeURI(item.name).match(filter)) {
        return item
      }
    })
    if (!prefsFile[0]) {
      writeLn('Unable to load layer label colors in  ' + prefsFile[0].fsName)
      return null
    }
    return prefsFile[0]

    function getPrefsFolder(appVersion) {
      var folderPath = Folder.userData.fsName + '/Adobe/After Effects/' + appVersion
      if (!~$.os.indexOf('Win')) {
        folderPath = Folder.userData.parent.fsName + '/Preferences/Adobe/After Effects/' + appVersion
      }
      return folderPath
    }
    function getLookupFilter(appVersion) {
      var lang = parseFloat(app.version) < 9 ? $.locale : app.isoLanguage
      var suffix = lang.toLowerCase().match('zh') ? '设置' : 'Prefs'
      var qualifier = '-indep-general'
      var filter = suffix + qualifier + '*'
      return filter
    }
  }

  getFiles.find = function(format, target) {
    var i, regex
    regex = new RegExp('\\.(' + format + ')$')
    var files = target.getFiles(regex)
    var folders = target.getFiles(/^(.(?!\.\w+))+$/)
    for (i = folders.length - 1; i >= 0; i--) {
      if (folders[i] instanceof File) folders.splice(i, 1)
    }
    for (i = files.length - 1; i >= 0; i--) {
      if (files[i] instanceof Folder) {
        files.splice(i, 1)
        folders.push(files[i])
      }
    }
    return {
      folders: folders,
      files: files
    }
  }

  getFiles.all = function(target) {
    var i
    var files = target.getFiles(/\.\w+$/)
    var folders = target.getFiles(/^(.(?!\.\w+))+$/)
    for (i = folders.length - 1; i >= 0; i--) {
      if (folders[i] instanceof File) folders.splice(i, 1)
    }
    for (i = files.length - 1; i >= 0; i--) {
      if (files[i] instanceof Folder) {
        files.splice(i, 1)
        folders.push(files[i])
      }
    }
    return {
      folders: folders,
      files: files
    }
  }

  return getFiles
})()
module.exports = $.global.yp.getFiles = getFiles
