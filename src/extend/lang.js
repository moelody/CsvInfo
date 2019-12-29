/** **********************************界面的字符串资源***************************************/
const { ex } = require('src/singleton')
module.exports = (function() {
  ex.extend({
    /** **********************************帮助提示************************************* **/
    createTip: {
      en: `click to quick add a note
ctrl/cmd: quick add a folder
shift: advance add panel`,
      ch: `点击快速添加笔记
ctrl/cmd: 快速添加文件夹
shift: 高级添加面板`
    },
    btn1Tip: {
      en: `click to import .csv file
rightC: quick set csv info`,
      ch: `点击导入.csv文件
右击: 快速设置csv信息`
    },
    addKeyStr: { en: 'import csv', ch: '导入csv' },

    settingsTip: { en: 'general settings and help', ch: '一般设置和帮助' },

    /** **********************************界面信息************************************* **/
    okStr: { en: 'OK', ch: '确认' },
    refreshStr: { en: 'Refresh', ch: '刷新' },
    settingsStr: { en: 'Setting', ch: '设置' },
    aboutStr: { en: 'About', ch: '关于' },
    infoStr: { en: 'Info', ch: '信息' },
    optionStr: { en: 'Option', ch: '选项' },
    fontStr: { en: 'Font', ch: '字体' },
    layoutStr: { en: 'Layout', ch: '布局' },

    setCsvInfoStr: { en: 'csvInfoSettins', ch: 'csv信息设置' },
    csvIndexStr: { en: 'number abbreviation', ch: '序号简称' },
    csvTimeStr: { en: 'frame abbreviation', ch: '帧数简称' },

    winMarginsStr: { en: 'margins', ch: '边距' },
    itemSizeStr: { en: 'buttonSize', ch: '按钮大小' },
    itemSpacingStr: { en: 'buttonSpacing', ch: '按钮间隔' },

    fontFamilyStr: { en: 'fontFamily', ch: '字体系列' },
    fontStyleStr: { en: 'fontStyle', ch: '字体样式' },
    fontSizeStr: { en: 'fontSize', ch: '字体大小' },
    fontPosStr: { en: 'fontPosRevise', ch: '字体位置修正' },
    fontColorStr: { en: 'fontColor', ch: '字体颜色' },
    unfontColorStr: { en: 'unfontColor', ch: '未激活字体颜色' },
    isShowBGStr: { en: 'isShowBG', ch: '是否显示文字背景' },
    fontBGShapeStr: { en: 'fontBGShape', ch: '文字背景形状' },
    fontBGColorStr: { en: 'fontBGColor', ch: '文字背景颜色' },
    isShowStrokeStr: { en: 'isShowStroke', ch: '是否显示描边' },
    selectedFSizeStr: { en: 'selectedStrokeSize', ch: '选中框的描边大小' },
    selectedFColorStr: { en: 'selectedStrokeColor', ch: '选中框的描边颜色' },

    progressBarStr: { en: 'progress bar', ch: '进度条' },
    progressStr: { en: 'loading', ch: '加载中' },
    dotStr: { en: '.', ch: '。' },
    langStr: { en: 'force to english interface', ch: '强制英文(English)界面' },
    refreshStr: { en: 'Auto refresh script when close settings', ch: '关闭设置后自动刷新脚本' },
    checkVersionOnStartupStr: { en: 'Auto Check version on startup', ch: '启动时自动检查更新' },

    /** **********************************错误提示************************************* **/
    needComp: { en: 'Please select a comp first', ch: '脚本需要一个合成,当前合成不存在!' },
    needLayer: { en: 'Please select a layer first which can timeremap', ch: '脚本需要一个可以时间重映射的图层,当前图层不存在!' },
    findErr: { en: "Can't find ", ch: '找不到' },
    needProperties: { en: 'Please select a or more prop first', ch: '请选中一个或多个属性' },
    folderExistsAlert: { en: "Folder doesn't exists", ch: '文件夹不存在' },
    deleteFailed: { en: 'Delete Failed!', ch: '删除失败' }
  })
  ex.extend({
    /** **********************************版本信息************************************* **/
    newVersionFind: { en: 'New version found,please download the new version ', ch: '存在新版本,请下载最新版v' },
    newVersionNotFind: { en: 'No new version! v', ch: '已是最新版 v' },
    tryVersionFind: {
      en: 'It seems that you are using the beta version which is not released yet. v',
      ch: '未发现新版本, 你正在使用尚未发布的试用版 v'
    },
    shouldUpdateScript: {
      en: 'Would you like to upgrade to new version now?\r\n it will cost some time while ae will not response\r\n',
      ch: '现在开始更新新版本吗?\r\n下载时AE会停止响应数十秒时间.\r\n选否则可以选择通过浏览器下载'
    },
    shouldDownloadScript: {
      en: 'Would you like to download new version now?',
      ch: '是否通过浏览器自行下载最新版本?\r\n打开网页后右键另存为脚本文件即可'
    },
    downloaded: {
      en: 'Update success! To make it work, just restart script',
      ch: '升级成功, 请重启脚本'
    },
    help: {
      en: `Made by: yf
E-mail: yfsmallmoon@gmail.com
Source Code: github.com/yfsmallmoon

change language support autoreload

`,
      ch: `作者: yf(忆碗牛杂面)
邮箱: yfsmallmoon@gmail.com
源码托管地址: github.com/yfsmallmoon

改变语言支持自动重载

`
    }
  })
})()
