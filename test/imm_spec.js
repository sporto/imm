var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');

describe('imm', function(){
	it('creates a collection', function () {
		var col = imm(records());
		expect(col.count()).to.be(2)
	})

	it('throws if not given an array', function () {
		expect(function () {
			imm('A String');
		}).to.throwError();
	})

	it('takes an optional second args for the id', function(){
		var record = {
			_id: 'xyz',
			label: 'Tess'
		}
		var col = imm(recordWithAltId(), '_id');
		expect(col.get('xyz')).to.eql(record);
	})
});