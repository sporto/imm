var imm              = require('../../src/imm');
var chai             = require('chai');
var expect           = chai.expect;
var records          = require('../fixtures/records')();
var col;

describe('.find', function () {

	beforeEach(function () {
		col = imm.list(records);
	});

	it('finds a record using a function', function () {
		var finder = function (v) { return v.label === 'Tess' };
		var record = col.find(finder);
		expect(record).to.eql({id: 11, label: 'Tess'});
	})

	it('returns a mutable object', function () {
		var record = col.find(function (r) { return true; });
		expect(record).to.eql({id: 10, label: 'Sam'});
		record.label = 'Julia';
		expect(record).to.eql({id: 10, label: 'Julia'});
	})
})
