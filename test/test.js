var expect = require('chai').expect;
var mangle = require('../src/mangle');

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

describe('Mangler', function() {
    var mangler;

    beforeEach(function() {
	mangler = new mangle.Mangler();
    });
    
    it("should mangle identifiers into strings", function() {
	var mangledSymbol = mangler.mangle("aVariableName");

	expect(mangledSymbol).to.be.a('string');
    });
    
    it("should not mangle the same identifier into two different outputs", function() {
	var aVariableName = "aVariableName";
	var mangledSymbol = mangler.mangle(aVariableName);
	var anotherSymbol = mangler.mangle(aVariableName);

	expect(mangledSymbol).to.equal(anotherSymbol);
    });
    
    it("should mangle different identifiers into different outputs", function() {
	var mangledSymbol = mangler.mangle("anIdentifier");
	var anotherSymbol = mangler.mangle("anotherIdentifier");

	expect(mangledSymbol).to.not.equal(anotherSymbol);
    });
    
    it("should unmangle an output into its identifier", function() {
	var theIdentifier = "anIdentifier";
	var mangledSymbol = mangler.mangle(theIdentifier);

	expect(mangler.unmangle(mangledSymbol)).to.equal(theIdentifier);
    });
    
    it("should not unmangle outputs which have not been mangled", function() {
	var unusedIdentifier = "anIdentifier";

	expect(mangler.unmangle(unusedIdentifier)).to.be.empty;
    });
    
    it("should mangle any number of identifiers into unique symbols", function() {
	var identifiers = [];
	
	for(var i = 0; i < 100; i++) {
	    identifiers.push(makeIdentifier(10));
	}

	mangled = identifiers.map(function(identifier) {
	    return mangler.mangle(identifier);
	});

	mangledUnique = mangled.filter(function(value, index, self) {
	    return self.indexOf(value) === index;
	});;

	expect(mangledUnique.length).to.equal(identifiers.length);
    });
});
