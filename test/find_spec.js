var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records')();
var col;

describe('.find', function () {

	beforeEach(function () {
		col = imm(records);
	});

	it('finds a record using a function', function () {
		var finder = function (v) { return v.label === 'Tess' };
		var record = col.find(finder);
		expect(record).to.eql({id: 11, label: 'Tess'});
	});
})
