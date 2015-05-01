var imm              = require('../src/imm');
// var imm              = require('../dist/imm');
var chai             = require('chai');
var expect           = chai.expect;

describe('imm.obj', function(){

	it('creates an immutable object', function() {
		var obj = imm.obj({})
		expect(obj.isImmObject).to.eq(true)
	});

});