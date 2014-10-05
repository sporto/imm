var imm              = require('../lib/main');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.add', function () {

	beforeEach(function () {
		col1 = imm(records);
		col2 = imm(recordWithAltId, '_id');
	})

	it('adds a new record when there is no id', function () {
		expect(col1.count()).to.be(2);
		col1 = col1.add({label: 'Not ID'});
		expect(col1.count()).to.be(3);
	});

	it('adds a new record when there is no _id', function () {
		expect(col2.count()).to.be(2);
		col2 = col2.add({label: 'Not ID'});
		expect(col2.count()).to.be(3);
	});

	it('adds a new record when it has an id', function () {
		expect(col1.count()).to.be(2);
		col1 = col1.add({id: 13, label: 'Julia'});
		expect(col1.count()).to.be(3);
	});

	it('adds a new record when it has an _id', function () {
		expect(col2.count()).to.be(2);
		col2 = col2.add({_id: 'ijk', label: 'Julia'});
		expect(col2.count()).to.be(3);
	});

	it('throws if there is an existing record', function () {
		expect(function () {
			col1.add({id: 11, label: 'Not Tess'});
		}).to.throwError();
	});

	it('throws if there is an existing record (_id)', function () {
		expect(function () {
			col2.add({_id: 'xyz', label: 'Not Tess'});
		}).to.throwError();
	});
});