var imm              = require('../lib/main');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.set', function () {

	beforeEach(function () {
		col1 = imm(records);
		col2 = imm(recordWithAltId, '_id');
	})

	it('adds a new record when there is no id', function () {
		expect(col1.count()).to.be(2);
		col1 = col1.set({label: 'Not ID'});
		expect(col1.count()).to.be(3);
	})

	it('adds a new record when there is no _id', function () {
		expect(col2.count()).to.be(2);
		col2 = col2.set({label: 'Not ID'});
		expect(col2.count()).to.be(3);
	})

	it('adds a new record when it has an id', function () {
		expect(col1.count()).to.be(2);
		col1 = col1.set({id: 13, label: 'Julia'});
		expect(col1.count()).to.be(3);
	})

	it('adds a new record when it has an _id', function () {
		expect(col2.count()).to.be(2);
		col2 = col2.set({_id: 'ijk', label: 'Julia'});
		expect(col2.count()).to.be(3);
	})

	it('replaces an existing record when it has the same id', function () {
		var record = {id: 11, label: 'Not Tess'};
		expect(col1.count()).to.be(2);
		col1 = col1.set(record);
		expect(col1.count()).to.be(2);
		expect(col1.get(11)).to.eql(record);
	});

	it('replaces an existing record when it has the same _id', function () {
		var record = {_id: 'xyz', label: 'Not Tess'};
		// Given record is not undefined
		expect(col2.get('xyz')).not.to.be(undefined)
		expect(col2.count()).to.be(2);
		col2 = col2.set(record);
		expect(col2.count()).to.be(2);
		expect(col2.get('xyz')).to.eql(record);
	});

});