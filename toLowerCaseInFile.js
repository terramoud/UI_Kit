var fs = require('fs');
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

walk('', function(err, file) {
    //console.log(file);
    file.forEach(function(arg) {
        var changedFile = String(arg.replace(/\\/gi, '/'));
        if ( !/\/\./g.test(changedFile) && !/Fonts/g.test(changedFile) ) {
            fs.readFile(changedFile, 'utf8', (err, data) => {
                if (err) throw err;
                //console.log(changedFile);
                //console.log(data);
                customData = String(data).replace(/_([a-zA-Z])/g, function(str) {return str.toLowerCase();});
                fs.writeFile( changedFile, customData, function (err) {
                    if (err) throw err;
                    console.log(customData);
                });
            });
        }
    });   
});


