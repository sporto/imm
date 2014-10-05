var imm              = require('../lib/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.remove', function () {

	beforeEach(function () {
		col1 = imm(records());
		col2 = imm(recordWithAltId(), '_id');
	})

	it('removes the record', function () {
		expect(col1.count()).to.be(2);
		col1 = col1.remove({id: 11});
		expect(col1.count()).to.be(1);
	})

	it('removes the record', function () {
		expect(col2.count()).to.be(2);
		col2 = col2.remove({_id: 'abc'});
		expect(col2.count()).to.be(1);
	})

	it('throws if record is not found', function () {
		expect(function () {
			col1.remove({id: 13, label: 'Not there'});
		}).to.throwError();
	});

	it('throws if record is not found', function () {
		expect(function () {
			col2.remove({_id: 'ijk', label: 'Not there'});
		}).to.throwError();
	});

});