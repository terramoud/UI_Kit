var fs = require('fs');
var path = require('path');

// var dir = './pages/index.scss';
// var regexp = /\.\/Common\.blocks\/[a-z0-9]+\/[a-z-_0-9]+\/?[a-z-_0-9]*\/?[a-z-_0-9]*(\/|\.js|\.pug|\.scss)?/gi;
// var test = String(readableData).match(regexp);
// var paths = [];


var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


walk('./Common.blocks', function(err, file) {
    //console.log(file);
    file.forEach(function(arg) {
        var changedFile = String(arg.replace(/\\/gi, '/'));
        if ( !/\/\./g.test(changedFile) && !/Fonts/g.test(changedFile) ) {
            fs.readFile(changedFile, 'utf8', (err, data) => {
                if (err) throw err;
                //console.log(changedFile);
                //console.log(data);
                customData = String(data).replace(/_([a-zA-Z])/g, function(str, p1) {return p1.toLowerCase();};
                fs.writeFile( changedFile, customData, function (err) {
                    if (err) throw err;
                    console.log(customData);
                });
            });
        }
    });   
});


/**
* this too worked but by using generator
*/
// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var pending = list.length;
//     if (!pending) return done(null, results);
//     list.forEach(function(file) {
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             if (!--pending) done(null, results);
//           });
//         } else {
//           results.push(file);
//           if (!--pending) done(null, results);
//         }
//       });
//     });
//   });
// };
// function* foo(file){
//     for (var i = 0; i < file.length; i++) {
//         var changedFile = String( file[i].replace(/\\/gi, '/') );
//         if (!/\/\./g.test(changedFile)) {
//             listtt.push(changedFile);
//             yield readAllFiles(changedFile);
//         }
//     }
// }

// walk('./Common.blocks', function(err, file) {
// /*    setInterval( function() {
//         foo(file).next();
//     }, 200);*/


//         /* foreach generator*/
//     for(let value of generateSequence(file)) {
//       setTimeout(function() {
//            readAllFiles(value);
//       }, 500);
//        //console.log(value);
//     }

// });

// function readAllFiles(pathFile) {
//     fs.readFile(pathFile, 'utf8', (err, data) => {
//         if (err) throw err;
//         //console.log(pathFile);
//         console.log(data);
//     });
// }

// /*this generator*/
// function* generateSequence(file) {
//     //console.log(file);
//     for (var i = 0; i < file.length; i++) {
//         var changedFile = String( file[i].replace(/\\/gi, '/') );
//         if ( !/\/\./g.test(changedFile) && !/Fonts/g.test(changedFile)) {
//             listtt.push(changedFile);
//             yield changedFile;
//         }
//     }
// }
