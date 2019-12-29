module.exports = function(src) {
  const file = this.resourcePath // Get MIME type

  const callback = this.async()

  if (this.cacheable) {
    this.cacheable()
  }

  callback(null, require(file.split('.')[0] + '.txt'))
}
