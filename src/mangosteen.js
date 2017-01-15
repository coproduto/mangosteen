var Mangler = function() {
    this._table = {};
    this._reverseTable = {};
    this._current = "A";
    this._codes = {
	 $: 36,
	 Z: 90,
	 _: 95,
	 z: 122,
    };
}

function insertChar(input, c, index) {
    return input.substring(0, index)
	+ c
	+ input.substring(index + 1, input.length);
}


Mangler.prototype._nextChar = function(c) {
    switch(c) {
    case this._codes.$: return 'A';
    case this._codes.Z: return '_';
    case this._codes._: return 'a'
    case this._codes.z: return '$';
    default: return String.fromCharCode(++c);
    }
}

Mangler.prototype._nextStr = function(s) {
    var output = s;
    var index = s.length - 1;
    
    var c = s.charCodeAt(index);
    while(c === this._codes.$) {
	output = insertChar(output, this._nextChar(c), index);

	index--;
	if(index < 0) {
	    return output + 'A';
	}
	c = s.charCodeAt(index);
    }

    return insertChar(output, this._nextChar(c), index);
}

Mangler.prototype.mangle = function(str) {
    if(!(str in this._table)) {
	this._table[str] = this._current;
	this._reverseTable[this._current] = str;
	this._current = this._nextStr(this._current);
    }
    return this._table[str];
}

Mangler.prototype.unmangle = function(str) {
    if(str in this._reverseTable) {
	return this._reverseTable[str];
    } else {
	return "";
    }
}

Mangler.prototype.makeManglingTable = function() {
    return this._table;
}

Mangler.prototype.makeLookupTable = function() {
    return this._reverseTable;
}

module.exports = {
    Mangler: Mangler,
    default: Mangler
};
