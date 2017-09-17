//Synchronous continuation-passing style

function addSync(a, b, callback){
    return callback(a+b)
};

//The result of a + b is passed to a callback, this style of passing is called the CPS (continuation passing style)

//Lets call the add function now
console.log('before')
addSync(4, 5, function(sum){
    console.log('Result', sum)
})

console.log('after')

//Lets look at the Asynchronous continuation-passing style

function add(a, b, callback){
    setTimeout(function(){
        callback(a+b)
    }, 1000);
}


console.log('before')
add(4, 5, function(sum){
    console.log('Result', sum)
})
console.log('after')


//Alway remeber to use either synchronous or asynchronous api, don't mix them it will lead to unleasing the zalgo.

//Let's understand: How to write purely asynchronous callback by using process.nextTick()


var fs = require('fs')
var cache = {}
function consistentReadAsync(file, callback){
    if(cache[file]){
        process.nextTick(function(){
            callback(file)
        })
    }else{
        fs.readFile(file, 'utf-8', function(err, data){
            cache[file] = data;
            callback(data)
        })
    }
}


consistentReadAsync('rahul.txt', function(data){
    console.log('data', data)
})

//Propogating the errors ... 
function readJSON(filename, callback){
    fs.readFile(filename, 'utf8', function(err, data){
        if(err){
            return callback(err, null)
        }
        var parsed;
        try{
            parsed = JSON.parse(data)
        }catch(err){
            return callback(err, null)
        }

        callback(null, parsed)
    })
}

readJSON('rahul.txt', function(err, data){
    if(err){
        return console.log('Error while reading JSON file ', err)
    }

    console.log(data)
})


