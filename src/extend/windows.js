const { ex } = require('src/singleton')
const { loc } = ex

/** **********************************界面的一些刷新功能***************************************/
ex.extend({
  clickRipple(event) {
    if (!event) return
    if (event.button === 0 && event.detail === 1 && event.altKey === false) {
      var currentPosition = [event.clientX, event.clientY]

      var btn = ex.addCustomView(
        {
          id: 'winRipple',
          frame: 0,
          visible: 1
        },
        true
      )
      btn.bounds = [currentPosition[0] - 40, currentPosition[1] - 40, currentPosition[0] + 40, currentPosition[1] + 40]
    }
  }
})
