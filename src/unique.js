var UniqueGen = function(){
  
  var UniqueGen = function() {
    var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercase = "abcdefghijklmnopqrtuvwxyz";
    var symbols = "$_";
    var numbers = "1234567890";

    this._registeredIdentifiers = [];
    this._allowedCharacters = uppercase + lowercase + symbols + numbers;
  };

  function _nextStr(s) {
    if(s.charAt(s.length - 1)
       === this._allowedCharacters.charAt(this._allowedCharacters.length - 1)) {
      return s + this._allowedCharacters.charAt(0);
    } else {
      var lastChar = s.charAt(s.length - 1);
      var index = this._allowedCharacters.indexOf(lastChar);

      return s.substring(0, s.length - 1)
	+ this._allowedCharacters.charAt(index + 1);
    }
  }

  UniqueGen.prototype.generate = function() {
    var prefix = "$$" + this._allowedCharacters.charAt(0);

    var possibleCollisions = this._registeredIdentifiers.slice(0);
    while(possibleCollisions.length > 0) {
      possibleCollisions = possibleCollisions.filter(function(x) {
        return x.startsWith(prefix);
      });

      if(possibleCollisions.length > 0) {
        prefix = _nextStr(prefix);
      }
    }

    this._registeredIdentifiers.push(prefix);
    return prefix;
  };

  UniqueGen.prototype.generateFrom = function(str) {
    var suffix = "_" + this._allowedCharacters.charAt(0);
    
    var possibleCollisions = this._registeredIdentifiers.slice(0);
    while(possibleCollisions.length > 0) {
      possibleCollisions = possibleCollisions.filter(function(x) {
        return x.startsWith(str+suffix);
      });

      if(possibleCollisions.length > 0) {
        suffix = _nextStr(suffix);
      }
    }

    this._registeredIdentifiers.push(str + suffix);
    return str + suffix;
  };

  UniqueGen.prototype.registerIdentifiers = function(ids) {
    if(typeof ids === "object") {
      if(Array.isArray(ids)) {
        this._registeredIdentifiers.concat(ids);
      }
    } else if(typeof ids === "string") {
      this._registeredIdentifiers.push(ids);
    }
  };

  return UniqueGen;
}();

module.exports = {
  UniqueGen: UniqueGen,
  default: UniqueGen
};
