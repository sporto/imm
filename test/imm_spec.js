var imm              = require('../src/imm');
// var imm              = require('../dist/imm');
var chai             = require('chai');
var expect           = chai.expect;

describe('imm', function() {

	it('shows a deprecation messages', function() {
		imm([]);
	});

});