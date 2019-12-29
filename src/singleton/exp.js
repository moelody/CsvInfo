const Root = require('./Root')
const request = require('src/https')

const exp = new Root({
  scriptName: 'exp',
  version: process.env.VERSION,
  slash: '/'
})

exp.extend({
  scriptFile: new File($.fileName),
  expressionFolder: new Folder(exp.haveSetting('expressionFolder') ? exp.getSetting('expressionFolder') : File($.fileName).path + exp.slash + exp.scriptName),

  lang: 0,
  mode: 'tree',
  bounds: [0, 0, 30, 25],

  checkVersionLink: 'https://api.github.com/repos/yfsmallmoon/ExpNotes/git/refs/tags',
  downloadLinkPrefix: 'https://raw.githubusercontent.com/yfsmallmoon/ExpNotes/v',
  downloadLinkSuffix: '/dist/ExpNotes.jsx',

  beautylink: 'https://github.com/HookyQR/VSCodeBeautify/blob/master/Settings.md',

  options: {
    indent_size: 2,
    wrap_line_length: 180,
    end_with_newline: true,
    jslint_happy: true,
    brace_style: 'collapse,preserve-inline',
    space_in_empty_paren: true
  }
})

exp.extend({
  openLink(url) {
    var cmd = ''
    if (~$.os.indexOf('Win')) {
      cmd += 'explorer ' + url
    } else {
      cmd += 'open "' + url + '"'
    }
    try {
      system.callSystem(cmd)
    } catch (e) {}
  },
  getVersion: function() {
    try {
      var response = request('GET', this.checkVersionLink, '')
      var data = eval('(' + response + ')')
      var latestTag = '0'

      data.forEach(function(item, index) {
        var tagArr = item.ref.match(/v(.*?)$/i)
        if (tagArr.length >= 1) {
          var tag = tagArr[1]
          if (latestTag <= tag) latestTag = tag
        }
      })
      return latestTag
    } catch (err) {
      return -1
    }
  },
  compareSemver: function(a, b) {
    var pa = a.split('.')
    var pb = b.split('.')
    for (var i = 0; i < 3; i++) {
      var na = Number(pa[i])
      var nb = Number(pb[i])
      if (na > nb) return 1
      if (nb > na) return -1
      if (!isNaN(na) && isNaN(nb)) return 1
      if (isNaN(na) && !isNaN(nb)) return -1
    }
    return 0
  }
})

module.exports = $.global.yp.exp = exp
