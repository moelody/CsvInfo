const { ex } = require('src/singleton')

const { ICONS } = require('src/icon')
const _ = require('src/ui/UIParser')
const utils = require('src/ui/UtilsUI')

module.exports = function() {
  const { loc } = ex
  const { font } = ex
  try {
    _.root.children = []
    var UIJson = {
      newWin: {
        type: 'palette',
        text: loc(ex.aboutStr),
        margins: 10,
        orientation: 'column',
        properties: {
          resizeable: false
        },
        children: {
          topGroup: {
            type: 'group',
            orientation: 'stack',
            margins: 10,
            alignment: ['top', 'fill'],
            children: {
              cafx: {
                type: 'image',
                image: ICONS.cafx,
                alignment: ['fill', 'fill'],
                preferredSize: [300, 40]
              }
            }
          },
          labGroup: {
            type: 'group',
            orientation: 'row',
            alignment: ['fill', 'fill'],
            alignChildren: ['fill', 'fill'],
            children: {
              settingsGrp: {
                type: 'group'
              },
              layoutGrp: {
                type: 'group'
              },
              fontGrp: {
                type: 'group'
              },
              infoGrp: {
                type: 'group'
              }
            }
          },
          bottomPanel: {
            type: 'panel',
            margins: 3,
            alignment: ['fill', 'fill'],
            alignChildren: ['fill', 'fill'],
            children: {
              bottomGroup: {
                type: 'group',
                orientation: 'stack',
                alignChildren: ['fill', 'fill'],
                children: {
                  settings: {
                    type: 'group',
                    orientation: 'column',
                    visible: true,
                    children: {
                      option: {
                        type: 'panel',
                        text: loc(ex.optionStr),
                        alignment: ['fill', 'fill'],
                        children: {
                          langGrp: {
                            type: 'group',
                            orientation: 'row',
                            spacing: 0,
                            alignment: ['fill', 'top']
                          },
                          checkVersionOnStartupGrp: {
                            type: 'group',
                            orientation: 'row',
                            spacing: 0,
                            alignment: ['fill', 'top']
                          },
                          refreshGrp: {
                            type: 'group',
                            orientation: 'row',
                            spacing: 0,
                            alignment: ['fill', 'top']
                          }
                        }
                      }
                    }
                  },
                  layout: {
                    type: 'group',
                    orientation: 'column',
                    visible: false,
                    children: {
                      winMarginsGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      itemSizeGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      itemSpacingGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      }
                    }
                  },
                  font: {
                    type: 'group',
                    orientation: 'column',
                    visible: false,
                    children: {
                      fontFamilyGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      fontStyleGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      fontSizeGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      fontPosGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      fontColorGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      unfontColorGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      isShowBGGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      fontBGShapeGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      fontBGColorGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      isShowStrokeGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      selectedFSizeGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      },
                      selectedFColorGrp: {
                        type: 'group',
                        orientation: 'row',
                        spacing: 0,
                        alignment: ['fill', 'top']
                      }
                    }
                  },
                  info: {
                    type: 'group',
                    orientation: 'column',
                    visible: false,
                    children: {
                      infoMessage: {
                        type: 'edittext',
                        text: loc(ex.help),
                        alignment: ['fill', 'fill'],
                        minimumSize: [0, 0],
                        preferredSize: [300, 200],
                        properties: {
                          multiline: true,
                          scrolling: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } // end of newWin
    }
    var win = _.newWindow(UIJson)[0]
    _('*').each(function(e) {
      switch (e.id) {
        default:
          break
        case 'cafx':
          e.image = ICONS.cafx
          e.addEventListener('mouseover', function() {
            this.image = ICONS.cafxlog
          })
          e.addEventListener('mouseout', function() {
            this.image = ICONS.cafx
          })
          break
        case 'labGroup':
          var g = e.children
          for (var i = 0; i < g.length; i++) ex.addLabelBtn(g[i], _('#bottomGroup')[0], i)
          ex.activeLab = g[0].children[0]
          break
        case 'font':
          var g = e.children
          for (var i = 0; i < g.length; i++) ex.addEditBtn(g[i], ex[e.id])
          break
        case 'layout':
          var g = e.children
          for (var i = 0; i < g.length; i++) ex.addSliderBtn(g[i], ex[e.id])
          break
        case 'option':
          var g = e.children
          for (var i = 0; i < g.length; i++) ex.addCheckboxBtn(g[i])
          break
      }
    })

    win.onClose = function() {
      if (ex.refresh) {
        if (ex.win instanceof Window) {
          ex.win.close()
          $.global[process.env.RE]()
        } else {
          app.executeCommand(app.findMenuCommandId(File($.fileName).displayName))
          app.executeCommand(app.findMenuCommandId(File($.fileName).displayName))
        }
        // ex.winOps.refresh(ex.win)
      }
    }
    win.layout.layout(true)
    win.center()
    win.show()
  } catch (err) {
    alert('Line #' + err.line.toString() + '\r\n' + err.toString())
  }
}
