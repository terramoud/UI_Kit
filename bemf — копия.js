var fs = require('fs');
var prependFile = require('prepend-file');

for (let j = 0; j < process.argv.length; j++) {
  console.log(j + ' -> ' + (process.argv[j]));
}

var entryPoint = (process.argv[2]); // index.pug
var createFileName = process.argv[3]; // body-text
var overrideLevel = ( /(Common\.blocks\b)|(Desktop\.blocks\b)|(Library\.blocks\b)/.test( process.argv[4] ) )? process.argv[4] + '/' : 'Common.blocks/';
var blockName = createFileName.match(/^[^_ ]+/i);
var elementName = createFileName.match(/__[^_ ]+/i);
var modName = createFileName.match(/[^_ ](_[^_ ]+)/i);

blockName = ( !blockName )? '' : blockName[0] + '/';
elementName = ( !elementName )? '' : elementName[0] + '/';
modName = ( !modName )? '' : modName[1] + '/';
fullPath = blockName + elementName + modName + createFileName;
console.log('../' + overrideLevel + blockName + elementName + modName + createFileName);

isModifier = createFileName.match(/^[^_]+(_[^_ ]+)/i); // deprecated

var now = new Date();
console.log(now.getHours() +":"+ (now.getMinutes()<10?'0':'') + now.getMinutes() +":"+ now.getSeconds());


try {
  if ( !fs.existsSync(overrideLevel + blockName) ){
    fs.mkdirSync(overrideLevel + blockName)
  }
} catch (err) {
  console.error(err)
}

try {
  if ( !fs.existsSync(overrideLevel + blockName + elementName) ){
    fs.mkdirSync(overrideLevel + blockName + elementName)
  }
} catch (err) {
  console.error(err)
}
try {
  if ( !fs.existsSync(overrideLevel + blockName + elementName + modName) ){
    fs.mkdirSync(overrideLevel + blockName + elementName + modName)
  }
} catch (err) {
  console.error(err)
}

var dataJs = "\nrequire('../" + overrideLevel + fullPath + ".js');";
//require('../Common.blocks/Content/__WrapperForFormElements/Content__WrapperForFormElements.js');
fs.appendFile('pages/' + entryPoint + '.js', dataJs, 'utf8',
  // callback function
  function(err) {
    if (err) throw err;
    // if no error
    console.log("js appended.")
  });

fs.writeFile( overrideLevel + fullPath + '.js', '', function (err) {
  if (err) throw err;
  console.log(`${createFileName}.js is created successfully.`);
});

var dataStyle = "\n@import '../" + overrideLevel + fullPath + "';";
fs.appendFile('pages/' + entryPoint + '.scss', dataStyle, 'utf8',
  // callback function
  function(err) {
    if (err) throw err;
    // if no error
    console.log("scss appended.")
  });

// var scssData =  '@media only screen and (max-width: 320px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 321px) and (max-width: 575px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 576px) and (max-width: 767px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 768px) and (max-width: 991px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 992px) and (max-width: 1199px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 1200px) and (max-width: 1439px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 1440px) and (max-width: 1440px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 1441px) and (max-width: 1680px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
//   '@media only screen and (min-width: 1681px) and (max-width: 1920px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n';

var scssData =  '.' + createFileName + ' {\n\n}\n\n' +
                '@media only screen and (min-width: 321px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
                '@media only screen and (min-width: 576px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
                '@media only screen and (min-width: 768px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
                '@media only screen and (min-width: 992px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
                '@media only screen and (min-width: 1200px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
                '@media only screen and (min-width: 1440px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n' +
                '@media only screen and (min-width: 1681px) {\n  .' + createFileName + ' {\n\n  }\n}\n\n';

fs.writeFile( overrideLevel + fullPath + '.scss', scssData, function (err) {
  if (err) throw err;
  console.log(`${createFileName}.scss is created successfully.`);
});

// if ( !isModifier && modName === '' ) { - deprecated
if ( modName === '' ) {
  fs.writeFile( overrideLevel + fullPath + '.pug', 'mixin ' + createFileName + '(args)\n' +
    "    -let modifierNames = '';\n" +
    "    -if (args === undefined) args = '';\n" +
    "        each val, key in args\n" +
    "            -modifierNames += 'container__layout_' + key + '__' + val\n" +
    "    div." + createFileName + "&attributes(attributes)(class=modifierNames)\n" +
    '        if block\n' +
    '            block', function (err) {
    if (err) throw err;
    console.log(`${createFileName}.pug is created successfully.`);
  });

  prependFile('pages/' + entryPoint + '.pug', 'include ../' + overrideLevel + fullPath + '.pug\n', function (err) {
    if (err) {
      // Error
    }

    // Success
    console.log('pug was prepended to file!');
  });

  var data = '\n+' + createFileName;
// append data to file
  fs.appendFile('pages/' + entryPoint + '.pug', data, 'utf8',
    // callback function
    function(err) {
      if (err) throw err;
      // if no error
      console.log("pug appended")
    });

}
