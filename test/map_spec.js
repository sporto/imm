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
		var newCol = col1.map(function(record) {
			return record.id;
		});
		expect(newCol.count()).to.be(2);
		expect(newCol.all()).to.eql([10, 11]);
	});

	it('doesnt modify original objects', function() {
		col1.map(function(record) {
			record.foo = 1;
			return record;
		});
		expect(col1.get(11)).to.eql({id: 11, label: 'Tess'});
	});

	it('returns an imm collection', function() {
		col1 = col1.map(function(record) {
			return record;
		});
		expect(col1.isImm).to.be(true);
	});

	it('doest mutate the original values', function () {
	
	});
});
