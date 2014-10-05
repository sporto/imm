var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.get', function () {

	beforeEach(function () {
		col1 = imm(records());
		col2 = imm(recordWithAltId(), '_id');
	})

	it('returns the record by id', function (){
		var record = col1.get('11');
		expect(record).to.eql({id: 11, label: 'Tess'});
	});

	it('returns the record by _id', function (){
		var record = col2.get('xyz');
		expect(record).to.eql({_id: 'xyz', label: 'Tess'});
	});

});