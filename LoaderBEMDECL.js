var fs = require('fs');
const path = require('path');

module.exports = function parentScopeLoader(source) {
    fs.copyFile(path.resolve(__dirname, "pages", "index.pug"), './pages/index.BEMDECL', (err) => {
        if (err) throw err;
        console.log('index.pug was copied to index.BEMDECL');
    });
    return source
};

