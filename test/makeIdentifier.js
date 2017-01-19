function randomChar(string) {
    return string.charAt(Math.floor(Math.random() * string.length));
}

function makeIdentifier(length) {
    var identifier = "";
    var first = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ_$";
    var rest = first + "0123456789";
    
    identifier += randomChar(first);
    for(var i = 0; i < length - 1; i++) {
	identifier += randomChar(rest);
    }

    return identifier;
}

module.exports = makeIdentifier;
module.exports.default = makeIdentifier; //ES6 compatibility
