var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.filter', function () {

	beforeEach(function () {
		col1 = imm(records());
		col2 = imm(recordWithAltId(), '_id');
	})

	it('filters', function() {
		col1 = col1.filter(function(record) {
			return record.label == 'Tess';
		});
		expect(col1.count()).to.be(1);
		expect(col1.get('11')).to.eql({id: 11, label: 'Tess'});
	})

	it('returns an imm collection', function() {
		col1 = col1.filter(function(record) {
			return record.label == 'Tess';
		});
		expect(col1.isImm).to.be(true);
	})


});