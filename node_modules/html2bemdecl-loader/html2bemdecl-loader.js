let html2bemjson = require("html2bemjson");
let bemjson2decl = require("bemjson-to-decl");

module.exports = function( content ){
    if (content == null && content == "") callback("html2bemdecl requires a valid HTML.");

    let callback = this.async();
    let bemjson = html2bemjson.convert( content );
    let decl = bemjson2decl.convert( bemjson );

    console.log(decl);
    callback(null, decl);

}
