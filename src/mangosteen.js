var Mangler = function() {
  this._table = {};
  this._reverseTable = {};
  this._current = "A";
  this._prefix = "";
  this._codes = {
    $: 36,
    Z: 90,
    _: 95,
    z: 122,
  };
};

function insertChar(c, index, string) {
  return string.substring(0, index)
    + c
    + string.substring(index + 1, string.length);
}

Mangler.prototype._nextChar = function(c) {
  switch(c) {
  case this._codes.$: return "A";
  case this._codes.Z: return "_";
  case this._codes._: return "a";
  case this._codes.z: return "$";
  default: return String.fromCharCode(++c);
  }
};

Mangler.prototype._nextStr = function(s) {
  var output = s;
  var index = s.length - 1;
  
  var c = s.charCodeAt(index);
  while(c === this._codes.$) {
    output = insertChar(this._nextChar(c), index, output);

    index--;
    if(index < 0) {
      return output + "A";
    }
    c = s.charCodeAt(index);
  }

  return insertChar(this._nextChar(c), index, output);
};

Mangler.prototype.mangle = function(str) {
  if(!(str in this._table)) {
    this._table[str] = this._prefix + this._current;
    this._reverseTable[this._current] = str;
    this._current = this._nextStr(this._current);
  }
  return this._table[str];
};

Mangler.prototype.unmangle = function(str) {
  if(str in this._reverseTable) {
    return this._reverseTable[str];
  } else {
    return "";
  }
};

Mangler.prototype.makeManglingTable = function() {
  return this._table;
};

Mangler.prototype.makeLookupTable = function() {
  return this._reverseTable;
};

Mangler.prototype.setPrefix = function(p) {
  this._prefix = p;
};

module.exports = {
  Mangler: Mangler,
  default: { Mangler: Mangler }
};
