const Root = require('./Root')
const request = require('src/https')

const csv = new Root({
  scriptName: 'sheetcsv',
  version: process.env.VERSION,
  slash: '/'
})

csv.extend({
  scriptFile: new File($.fileName),

  frame: 0,
  loading: 0,
  activeLab: {},
  renderTask: {},
  preset: {
    font: {
      fontFamily: '微软雅黑',
      fontStyle: 'BOLD', // REGULAR BOLD ITALIC BOLDITALIC
      fontSize: 14,
      fontPos: [6, -7],
      fontColor: [0.8, 0.8, 0.8],
      unfontColor: [0.4, 0.4, 0.4],
      isShowBG: 0,
      fontBGShape: 'rect', // rect or ellipse
      fontBGColor: [0.08, 0.08, 0.08],

      isShowStroke: 1,
      selectedFSize: 3,
      selectedFColor: [0.2, 0.7, 1]
    },
    layout: {
      winMargins: [3],
      itemSize: [32, 32],
      itemSpacing: [3, 3]
    },
    csvInfo: {
      csvIndex: 'number',
      csvTime: 'frame'
    },
    lang: false,
    refresh: false,
    checkVersionOnStartup: false
  },
  quicklist: {
    font: {
      fontFamily: ['微软雅黑', 'LainieDaySH'],
      fontStyle: ['BOLD', 'REGULAR', 'ITALIC', 'BOLDITALIC'], // REGULAR BOLD ITALIC BOLDITALIC
      fontSize: [12, 14, 16],
      fontPos: [[6, -7]],
      fontColor: [[0.8, 0.8, 0.8]],
      unfontColor: [[0.4, 0.4, 0.4]],
      isShowBG: [0, 1],
      fontBGShape: ['rect', 'ellipse'], // rect or ellipse
      fontBGColor: [[0.08, 0.08, 0.08]],

      isShowStroke: [0, 1],
      selectedFSize: [3],
      selectedFColor: [[0.2, 0.7, 1]]
    },
    csvInfo: {
      csvIndex: ['num', '序号', '卡号'],
      csvTime: ['fra', '时长', '帧数']
    }
  },
  unit: {
    csvIndex: 'number',
    csvTime: 'frame',

    fontFamily: 'font',
    fontStyle: 'style', // REGULAR BOLD ITALIC BOLDITALIC
    fontSize: 'px',
    fontPos: 'x, y',
    fontColor: 'r, g, b',
    unfontColor: 'r, g, b',
    isShowBG: 'boolean',
    fontBGShape: 'shape', // rect or ellipse
    fontBGColor: 'r, g, b',

    isShowStroke: 'boolean',
    selectedFSize: 'px',
    selectedFColor: 'r, g, b'
  },

  checkVersionLink: 'https://api.github.com/repos/yfsmallmoon/csvassub/git/refs/tags',
  downloadLinkPrefix: 'https://raw.githubusercontent.com/yfsmallmoon/csvassub/v',
  downloadLinkSuffix: '/dist/csvassub.jsx'
})

csv.extend({
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

module.exports = $.global.yp.csv = csv
