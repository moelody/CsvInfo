var Debug = (function() {
  function Debug() {}
  /** **********************继承函数************************************************************/
  var DB = Debug.prototype
  Debug.extend = function(target, source) {
    for (var i in source) target[i] = source[i]
    return target
  }
  Debug.extend(DB, {
    isType: function(content, type) {
      return Object.prototype.toString.call(content) === '[object ' + type + ']'
    },
    getPrototypeMethods: function(obj) {
      for (var i in obj) {
        try {
          if (obj[i] instanceof Function) {
            $.writeln(i + '=', obj[i])
          }
        } catch (e) {}
      }
    },
    getPerValue: function(obj) {
      for (var i in obj) {
        $.writeln(i + '=', obj[i])
      }
    },
    handleError: function(e) {
      var fileName = File.decode(e.fileName).replace(/^.*[\|\/]/, '')
      var functionName = $.stack.split('\n').reverse()[2]
      alert(e.toString() + '\nScript File:' + fileName + '\nFunction:' + functionName + '\nError on Line:' + e.line.toString())
    }
  })
  return Debug
})()
