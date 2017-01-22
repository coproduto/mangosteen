"use strict"
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

    for(var i = 0; i < 1000000; i++) {
      var len = Math.floor(Math.random() * 5);
      identifiers.push(makeIdentifier(len));
    }
    identifiers.push(undefined);

    unique.registerIdentifiers(identifiers);
    var uniqueIdentifier = unique.generate();

    var allUnique = identifiers.every(function(id) {
      return id !== uniqueIdentifier;
    });

    var counterExamples = identifiers.filter(function(id) {
      return id === uniqueIdentifier;
    });

    assert.isTrue(allUnique);
  });

  it("should generate unique identifiers from existing identifiers", function() {
    var identifiers = [];
    var identifier;

    for(var i = 0; i < 1000000; i++) {
      var len = Math.floor(Math.random() * 5 + 1);
      identifiers.push(makeIdentifier(len));
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

  it("should generate identifiers which do not collide with other generated identifiers", function() {
    var identifiers = [];
    
    for(var i = 0; i < 300; i++) {
      identifiers.push(unique.generate());
    }

    var allUnique = identifiers.every(function(thisId) {
      var equal = identifiers.filter(function(thatId) {
	return thisId === thatId;
      });

      return equal.length === 1;
    });

    assert.isTrue(allUnique);
  });
  

  it("should generate derived identifiers which do not collide with other generated identifiers", function() {
    var identifiers = [];
    var identifier = makeIdentifier(10);
    
    for(var i = 0; i < 300; i++) {
      identifiers.push(unique.generateFrom(identifier));
    }

    var allUnique = identifiers.every(function(thisId) {
      var equal = identifiers.filter(function(thatId) {
	return thisId === thatId;
      });
      
      return equal.length === 1;
    });

    assert.isTrue(allUnique);
  });
});
