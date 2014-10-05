var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.replace', function () {

	beforeEach(function () {
		col1 = imm(records());
		col2 = imm(recordWithAltId(), '_id');
	})

	it('replaces an existing record', function () {
		var record = {id: 11, label: 'New Tess'};
		expect(col1.count()).to.be(2);
		col1 = col1.replace(record);
		expect(col1.count()).to.be(2);
		expect(col1.get(11)).to.eql(record);
	});

	it('replaces an existing record (_id)', function () {
		var record = {_id: 'xyz', label: 'New Tess'};
		expect(col2.count()).to.be(2);
		col2 = col2.replace(record);
		expect(col2.count()).to.be(2);
		expect(col2.get('xyz')).to.eql(record);
	});

	it('throws if there is no existing record', function () {
		expect(function () {
			col1.replace({id: 13, label: 'Not there'});
		}).to.throwError();
	});

	it('throws if there is no existing record (_id)', function () {
		expect(function () {
			col2.replace({_id: 'ijk', label: 'Not there'});
		}).to.throwError();
	});

});