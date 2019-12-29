;(function() {
  var folder = Folder(File($.fileName).path)
  var regex = new RegExp('\\.(png|jpg|ico)$')
  var infiles = folder.getFiles(regex)

  var str, name, outfile
  var re1 = /^\(new String\(/
  var re2 = /\)\)$/

  for (var i = 0; i < infiles.length; i++) {
    name = infiles[i].name.substring(0, infiles[i].name.lastIndexOf('.'))
    outfile = File(folder.fullName + '/' + name + '.txt')
    infiles[i].open('r')
    infiles[i].encoding = 'BINARY'
    outfile.open('w')
    str = infiles[i].read().toSource()
    outfile.write(str.replace(re1, 'module.exports = ').replace(re2, ''))
    infiles[i].close()
    outfile.close()
  }
})()
