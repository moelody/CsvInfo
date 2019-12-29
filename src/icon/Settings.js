const createFiles = require('src/file/createFiles')
const { ex } = require('src/singleton')
const SETTINGS = require.context('./settings', false, /\.txt$/)
const settings = {}
SETTINGS.keys().forEach(function(item, index) {
  settings['settings-' + item.replace(/[^0-9]/gi, '')] = SETTINGS(item)
})
const SETTINGSFILE = createFiles(settings, 'settings')

module.exports = ex.SETTINGS = SETTINGSFILE
