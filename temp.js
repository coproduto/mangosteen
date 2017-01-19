var mangosteen = require('./src/mangosteen');
var mangler = new mangosteen.Mangler();

function randomChar(string) {
    return string.charAt(Math.floor(Math.random() * string.length));
}

function makeIdentifier(length) {
    var identifier = "";
    var first = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ";
    var rest = first + "0123456789";
    
    identifier += randomChar(first);
    for(var i = 0; i < length - 1; i++) {
	identifier += randomChar(rest);
    }

    return identifier;
}

function run() {
    identifiers = [];

    mangler.setPrefix("M$");
    
    for(var i = 0; i < 1000; i++) {
	identifiers.push(makeIdentifier(10));
    }

    mangled = identifiers.map(function(identifier) {
	return mangler.mangle(identifier);
    });

    for(var i in mangled) {
	if( i > 900) {
	    console.log(mangled[i]);
	}
    }
}

module.exports = run;
