/**
 * The Event Emitter
 */
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

//That is constructor, we need to instanciate this to use



function findPattern(file, regex) {
    var eeInstance = new EventEmitter();
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return eeInstance.emit('error', err);
        }

        eeInstance.emit('fileread', file);
        var match = null;

        if (match = data.match(regex)) {
            match.forEach(function (element) {
                eeInstance.emit('found', file, element)
            });
        }
    })
    return eeInstance;
}

findPattern('rahul.txt', /test \w+/g).on('fileread', function (filename) {
    console.log('FIle is read completely', filename)
}).on('found', function (file, element) {
    console.log('Match found', file, element)
}).on('error', function (err) {
    console.log('Error occured', err)
})


//Now we are going to see how to create an object observable
class findPatternClass extends EventEmitter {
    constructor(file, regex) {
        super();
        this.regex = regex;
        this.file = file;
    }

    find() {
        var self = this;
        fs.readFile(self.file, 'utf8', function (err, data) {
            if (err) {
                return self.emit('error', err);
            }

            self.emit('fileread', self.file);
            var match = null;

            if (match = data.match(self.regex)) {
                match.forEach(function (element) {
                    self.emit('found', self.file, element)
                });
            }
        })
        return this;
    }
}

var findPatternObj = new findPatternClass('rahul.txt', /hello \w+/g)
findPatternObj
.find()
.on('fileread', function (filename) {
    console.log('FIle is read completely', filename)
})
.on('found', function (file, element) {
    console.log('Match found', file, element)
})
.on('error', function (err) {
    console.log('Error occured', err)
})

