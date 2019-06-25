var fs = require('fs');
var prependFile = require('prepend-file');

for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}

var entryPoint = (process.argv[2]);
var dir = (process.argv[3]);
var fileName = (process.argv[4]);
var dirElem = (process.argv[5]);
var dirModificator = (process.argv[6]);
var pathTo = dir;

try {
    if ( !fs.existsSync("Common.blocks/" + dir) ){
        fs.mkdirSync("Common.blocks/" + dir)
    }
} catch (err) {
    console.error(err)
}

if  (dirElem) {
    pathTo = dir + '/' + dirElem;
    try {
        if ( !fs.existsSync("Common.blocks/" + pathTo) ){
            fs.mkdirSync("Common.blocks/" + pathTo)
        }
    } catch (err) {
        console.error(err)
    }
}

if  (dirModificator) {
    pathTo += '/' + dirModificator;
    try {
        if ( !fs.existsSync("Common.blocks/" + pathTo) ){
            fs.mkdirSync("Common.blocks/" + pathTo)
        }
    } catch (err) {
        console.error(err)
    }
}

fs.writeFile( "Common.blocks/" + pathTo + '/' + fileName + '.js', '', function (err) {
    if (err) throw err;
    console.log('File.js is created successfully.');
});

fs.writeFile( "Common.blocks/" + pathTo + '/' + fileName + '.scss', '.' + fileName +' {\n\n}', function (err) {
    if (err) throw err;
    console.log('File.scss is created successfully.');
});

if (!dirModificator) {
    fs.writeFile( "Common.blocks/" + pathTo + '/' + fileName + '.pug', 'mixin ' + fileName + '(cl, content)\n' +
        '    div.' + fileName + '(class= cl) #{content}\n' +
        '        if block\n' +
        '            block', function (err) {
        if (err) throw err;
        console.log('File.pug is created successfully.');
    });

    prependFile('pages/' + entryPoint + '.pug', 'include ../Common.blocks/' + pathTo + '/' + fileName + '.pug\n', function (err) {
        if (err) {
            // Error
        }

        // Success
        console.log('The "data to prepend" was prepended to file!');
    });

    var data = '\n+' + fileName + '()';
// append data to file
    fs.appendFile('pages/' + entryPoint + '.pug', data, 'utf8',
        // callback function
        function(err) {
            if (err) throw err;
            // if no error
            console.log("Data is appended to file successfully.")
        });
}