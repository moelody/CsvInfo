function time () {
    var utils = this
    this.convertToSecond = function (time) {
        var timeArray = time.split(':')
        var time =
      parseInt(timeArray[0], 10) * 3600 +
      parseInt(timeArray[1], 10) * 60 +
      parseFloat(timeArray[2])
        return time
    }
    this.fitFrame = function (time) {
        var frameDur = curComp.frameDuration
        var fitTime = frameDur * Math.round(time / frameDur)
        return fitTime
    }
}
