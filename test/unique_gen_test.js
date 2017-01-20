var expect = require('chai').expect;
var assert = require('chai').assert;
var mangosteen = require('../src/unique');
var makeIdentifier = require('../src/makeIdentifier');

describe('UniqueGen', function() {
    var unique;

    beforeEach(function() {
	unique = new mangosteen.UniqueGen();
    });

    it("should generate string identifiers", function() {
	var uniqueSymbol = unique.generate();

	expect(uniqueSymbol).to.be.a('string');
    });

    it("should generate string identifiers from names", function() {
	var uniqueSymbol = unique.generateFrom("aVariableName");

	expect(uniqueSymbol).to.be.a('string');
    });

    it("should generate unique identifiers", function() {
	var identifiers = [];
	var identifier;

	for(var i = 0; i < 10000; i++) {
	    identifiers.push(makeIdentifier(10));
	}
	identifiers.push(undefined);

	unique.registerIdentifiers(identifiers);
	var uniqueIdentifier = unique.generate();

	var allUnique = identifiers.every(function(id) {
	    return id !== uniqueIdentifier;
	});

	assert.isTrue(allUnique);
    });

    it("should generate unique identifiers from existing identifiers", function() {
	var identifiers = [];
	var identifier;

	for(var i = 0; i < 10000; i++) {
	    identifiers.push(makeIdentifier(10));
	}
	identifiers.push(undefined);

	identifier = makeIdentifier(10);

	unique.registerIdentifiers(identifiers);
	var uniqueIdentifier = unique.generateFrom(identifier);

	var allUnique = identifiers.every(function(id) {
	    return id !== uniqueIdentifier;
	});

	assert.isTrue(allUnique);
    });
});
