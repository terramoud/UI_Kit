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
      var customNameFile = file.replace(/\\/gi, '/');
      
      var changedFileName = customNameFile.replace(/_([a-zA-Z])/g, function(str) {return str.toLowerCase();});
      console.log(changedFileName);
      fs.rename(customNameFile, changedFileName, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });

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


walk('', function(err, file) {});