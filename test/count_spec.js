var imm              = require('../lib/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.count', function () {

	beforeEach(function () {
		col1 = imm(records());
		col2 = imm(recordWithAltId(), '_id');
	})

	it('returns the count', function (){
		var res = col1.count();
		expect(res).to.be(2);
	});

	it('returns the count', function (){
		var res = col2.count();
		expect(res).to.be(2);
	});
});