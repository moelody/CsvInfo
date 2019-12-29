module.exports = (function() {
  Array.prototype.removeAll =
    Array.prototype.removeAll ||
    function() {
      this.length = 0
      return true
    }

  Array.prototype.includes =
    Array.prototype.includes ||
    function(value) {
      for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] === value) {
          return true
        }
      }
      return false
    }

  Array.prototype.forEach =
    Array.prototype.forEach ||
    function(callback, context) {
      if (Object.prototype.toString.call(this) === '[object Array]') {
        var i, len
        for (i = 0, len = this.length; i < len; i++) {
          if (typeof callback === 'function' && Object.prototype.hasOwnProperty.call(this, i)) {
            if (callback.call(context, this[i], i, this) === false) {
              break
            }
          }
        }
      }
    }

  Array.prototype.pushh =
    Array.prototype.pushh ||
    function(str) {
      // chains call for Array.push()
      this.push(str)
      return this
    }

  Array.prototype.indexOf =
    Array.prototype.indexOf ||
    function(searchElement, fromIndex) {
      if (this === void 0 || this === null) {
        throw new TypeError('Array.prototype.indexOf called on null or undefined')
      }
      var k
      var O = Object(this)
      var len = O.length >>> 0
      if (len === 0) {
        return -1
      }
      var n = fromIndex | 0
      if (n >= len) {
        return -1
      }
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
      while (k < len) {
        if (k in O && O[k] === searchElement) {
          return k
        }
        k++
      }
      return -1
    }

  Array.prototype.from =
    Array.prototype.from ||
    (function() {
      var toStr = Object.prototype.toString
      var isCallable = function(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
      }
      var toInteger = function(value) {
        var number = Number(value)
        if (isNaN(number)) {
          return 0
        }
        if (number === 0 || !isFinite(number)) {
          return number
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
      }
      var maxSafeInteger = Math.pow(2, 53) - 1
      var toLength = function(value) {
        var len = toInteger(value)
        return Math.min(Math.max(len, 0), maxSafeInteger)
      }
      var toItems = function(value) {
        // support set
        if (value.size > 0 && value.values) {
          const values = value.values()
          var it = values.next()
          var o = []
          while (!it.done) {
            o.push(it.value)
            it = values.next()
          }
          return o
        }
        return Object(value)
      }
      // The length property of the from method is 1.
      return function from(arrayLike /*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this

        // 2. Let items be ToObject(arrayLike).
        var items = toItems(arrayLike)

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined')
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined
        var T
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function')
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2]
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length)

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len)

        // 16. Let k be 0.
        var k = 0
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue
        while (k < len) {
          kValue = items[k]
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
          } else {
            A[k] = kValue
          }
          k += 1
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len
        // 20. Return A.
        return A
      }
    })()
})()
