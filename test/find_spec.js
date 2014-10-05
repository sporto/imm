var imm      = require('../lib/main');
var expect   = require('expect.js');
var records  = require('./fixtures/records')();
var col;

describe('.find', function () {

	beforeEach(function () {
		col = imm(records);
	})

	it('finds a record using a function', function () {
		var record = col.find(function (v) { return v.label === 'Tess' });
		expect(record).to.eql({id: 11, label: 'Tess'});
	})
})