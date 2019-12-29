var keyboard = (function() {
  var keyPairings = {
    '-': 'minus',
    '=': 'equal',
    '[': 'leftbracket',
    ']': 'rightbracket',
    ';': 'semicolon',
    '\\': 'backslash',
    '`': 'apostrophe',
    ',': 'comma',
    '.': 'period',
    ' /': 'slash'
  }
  var exports = {
    key: function() {
      return getKeysArray()
    },
    keyNameToKeySign: function(keyName) {
      for (var keySign in keyPairings) {
        if (!Object.prototype.hasOwnProperty.call(keyPairings, keySign)) {
          continue
        }
        if (keyPairings[keySign] === keyName) {
          return keySign
        }
      }
      return keyName
    },
    keySignToKeyName: function(keySign) {
      if (Object.prototype.hasOwnProperty.call(keyPairings, keySign)) {
        return keyPairings[keySign]
      } else {
        return keySign
      }
    }
  }
  return exports

  function getKeysArray() {
    var key, keyName
    var keyState = ScriptUI.environment.keyboardState
    var keyNames = [
      {
        key: keyState.shiftKey,
        keyName: 'shift'
      },
      {
        key: keyState.ctrlKey || keyState.metaKey,
        keyName: 'cmd'
      },
      {
        key: keyState.altKey,
        keyName: 'alt'
      },
      {
        key: keyState.keyName
      }
    ]
    var keysArray = []
    for (var i = 0, il = keyNames.length; i < il; i++) {
      key = keyNames[i].key
      if (key) {
        keyName = keyNames[i].keyName
        if (!keyName) {
          keyName = key.toLowerCase()
        }
        keysArray.push(keyName)
      }
    }
    if (keysArray.length === 0) {
      return null
    }
    return keysArray
  }
})()
module.exports = $.global.yp.keyboard = keyboard
