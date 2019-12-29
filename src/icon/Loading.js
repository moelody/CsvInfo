const createFiles = require('src/file/createFiles')
const { ex } = require('src/singleton')
const LOADING = require.context('./loading', false, /\.txt$/)
const loading = {}
LOADING.keys().forEach(function(item, index) {
  loading['loading-' + item.replace(/[^0-9]/gi, '')] = LOADING(item)
})
const LOADINGFILE = createFiles(loading, 'loading')

module.exports = ex.LOADING = LOADINGFILE
