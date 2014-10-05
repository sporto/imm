var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.map', function () {

	beforeEach(function () {
		col1 = imm(records());
		col2 = imm(recordWithAltId(), '_id');
	})

	it('maps', function() {
		col1 = col1.map(function(record) {
			record.foo = 1;
			return record;
		});
		expect(col1.count()).to.be(2);
		expect(col1.get('11')).to.eql({id: 11, foo: 1, label: 'Tess'});
	})

	it('returns an imm collection', function() {
		col1 = col1.map(function(record) {
			return record;
		});
		expect(col1.isImm).to.be(true);
	})


});