const { ex } = require('src/singleton')
var createFiles = (function() {
  function createFiles(binaryArray, subFolder) {
    return createFiles.covertToGraphic(binaryArray, subFolder)
  }

  createFiles.covertToGraphic = function(binaryArray, subFolder) {
    var targetFolder = new Folder(Folder.userData.fullName + ex.slash + 'Aescripts' + ex.slash + ex.scriptName + ex.slash + ex.version)
    if (subFolder) targetFolder = new Folder(targetFolder.fullName + ex.slash + subFolder)
    !targetFolder.exists && targetFolder.create()

    var icon
    var iconArrays = {}
    for (var i in binaryArray)
      if (typeof binaryArray[i] === 'string') {
        icon = new File(targetFolder.fullName + ex.slash + i + '.png')
        if (!icon.exists) {
          icon.encoding = 'BINARY'
          icon.open('w')
          icon.write(binaryArray[i])
          icon.close()
        }
        iconArrays[i] = icon
      } else iconArrays[i] = binaryArray[i]
    return iconArrays
  }

  return createFiles
})()
module.exports = $.global.yp.createFiles = createFiles
