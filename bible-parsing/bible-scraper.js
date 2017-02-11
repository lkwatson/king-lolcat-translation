var x2j = require('xml2js')
var fs = require('fs')

var xml = fs.readFileSync(__dirname + "/data_set/eng-kjv.osis.xml","utf-8")

function xmlToJs(file, callMe) {
	return x2j.parseString(file, {}, callMe);
}

xmlToJs(xml, (err, obj) => {
	console.dir(obj.)
});

