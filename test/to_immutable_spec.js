var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var Immutable        = require('immutable');
var col1;
var col2;


describe('.update', function () {

	beforeEach(function () {
		col1 = imm(records());
		col2 = imm(recordWithAltId(), '_id');
	})

	it('returns an immutable collection', function () {
		var immutable = col1.toImmutable();
		expect(immutable.toJS).to.be.a('function');
	})

});