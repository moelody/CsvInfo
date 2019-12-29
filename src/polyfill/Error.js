module.exports = (function() {
  require('lib/OperatorOverload')

  Error.prototype.print =
    Error.prototype.print ||
    function() {
      return 'Line #' + this.line.toString() + '\r\n' + this.toString()
    }

  Error.prototype.printc =
    Error.prototype.printc ||
    function() {
      cout << '\n---------'
      cout << this.print()
      cout << '---------\n'
    }

  Error.prototype.printa =
    Error.prototype.printa ||
    function() {
      this.print() << cout
    }
})()
