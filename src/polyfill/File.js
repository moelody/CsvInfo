module.exports = (function() {
  File.prototype.writee =
    File.prototype.writee ||
    function(str) {
      // method to write file
      this.open('w')
      this.write(str)
      this.close()
    }

  File.prototype.readd =
    File.prototype.readd ||
    function() {
      // method to read from file
      this.open('r')
      var str = this.read()
      this.close()
      return str
    }

  File.prototype.evalFile =
    File.prototype.evalFile ||
    function() {
      // method to read from file
      try {
        $.evalFile(this.fullName)
      } catch (e) {
        this.encoding = 'BINARY'
        this.open('r')
        var str = this.read()
        this.close()
        eval(str)
      }
    }
})()
