module.exports = (function() {
  Object.prototype.assign =
    Object.prototype.assign ||
    function(target) {
      if (target == null || target === undefined) {
        target = {}
      }

      target = Object(target)
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index]
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
      }
      return target
    }

  Object.prototype.keys =
    Object.prototype.keys ||
    (function(obj) {
      var hasOwnProperty = Object.prototype.hasOwnProperty
      var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString')
      var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor']
      var dontEnumsLength = dontEnums.length

      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object')
        }
        var result = [],
          prop,
          i

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop) && typeof obj[prop] !== 'function') {
            result.push(prop)
          }
        }
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i])
            }
          }
        }
        return result
      }
    })()
})()
