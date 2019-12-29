module.exports = (function() {
  Color.prototype.hexToRgb =
    Color.prototype.hexToRgb ||
    function(hex) {
      var hexColor = hex.replace('#', '')
      var r = parseInt(hexColor.slice(0, 2), 16) / 255
      var g = parseInt(hexColor.slice(2, 4), 16) / 255
      var b = parseInt(hexColor.slice(4, 6), 16) / 255
      return [r, g, b, 1]
    }
})()
