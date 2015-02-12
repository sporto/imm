var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.get', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm(records());
		})

		it('returns the record by id', function (){
			var record = col.get(11);
			expect(record).to.eql({id: 11, label: 'Tess'});
		});
	})

	describe('_id', function () {
		beforeEach(function () {
			col = imm(recordWithAltId(), '_id');
		})

		it('returns the record by _id', function (){
			var record = col.get('xyz');
			expect(record).to.eql({_id: 'xyz', label: 'Tess'});
		})
	})

});
