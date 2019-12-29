function Convert () {
    var convert = this
    this.checkGraphicType = function (files) {
        var fileCup = []
        for (var i = 0; i < files.length; i++) {
            var suffix = files[i].name.substring(files[i].name.lastIndexOf('.') + 1)
            if ((suffix == 'png') || (suffix == 'jpg') || (suffix == 'ico')) {
                fileCup.push(files[i])
            }
        }
        return fileCup
    }
    this.GraphicConvert = function () {
        var infiles = File.openDialog('选择图片,PNG/JPG格式', true) // 选择图片,可多选
        var outfileTemp = File(infiles).path//Folder.selectDialog('选择存放TXT文件的位置') // 选择存放位置
        var infiles = this.checkGraphicType(infiles)
        if (infiles != null && outfileTemp != null) {
            this.GraphicToText(infiles, outfileTemp)
        }
    }
    this.GraphicToText = function (infiles, outfileTemp) {
        var str; var name; var outfile; var re1 = /^\(new String\(/
        var re2 = /\)\)$/

        for (var i = 0; i < infiles.length; i++) {
            name = infiles[i].name.substring(0, infiles[i].name.lastIndexOf('.'))
            outfile = File(outfileTemp + '\/' + name + '.txt')
            infiles[i].open('r')
            infiles[i].encoding = 'BINARY'
            outfile.open('w')
            str = infiles[i].read().toSource()
            outfile.write(str.replace(re1, '').replace(re2, ';'))
            infiles[i].close()
            outfile.close()
        }
    }
    this.TextConvert = function () {
        var infiles = File.openDialog('选择txt', true) // 选择图片,可多选
        var outfileTemp = Folder.selectDialog('选择存放图片的位置') // 选择存放位置
        var infiles = this.checkGraphicType(infiles)
        if (infiles != null && outfileTemp != null) {
            this.TextToGraphic(infiles, outfileTemp)
        }
    }
    this.TextToGraphic = function (infiles, outfileTemp) {
        var str; var name; var outfile; var re1 = /^\(new String\(/
        var re2 = /\)\)$/

        for (var i = 0; i < infiles.length; i++) {
            name = infiles[i].name.substring(0, infiles[i].name.lastIndexOf('.'))
            outfile = File(outfileTemp + '\/' + name + '.png')
            infiles[i].open('r')
            str = infiles[i].read()
            infiles[i].close()
            try {
                str = eval(str)
                outfile.encoding = 'BINARY'
                outfile.open('w')
                outfile.write(str)
                outfile.close()
            } catch (error) {
                alert('解析字符串错误,第' + i + '个txt文件内不是正确的图片二进制格式')
            }
        }
    }
    this.convert = function (path, icons_array) {
        var myFolder = Folder(path)
        var iconArray = icons_array

        for (var i = 0; i < iconArray.length; i++) {
            var myFile = File(myFolder.fullName + '/' + i + '.txt')
            myFile.encoding = 'BINARY'
            myFile.open('w')
            var str = iconArray[i].toSource()
            myFile.writeln(str)
            myFile.close()
        }
    }
    this.init = function () {
        this.TextConvert()
    }
}
new Convert().GraphicConvert()
