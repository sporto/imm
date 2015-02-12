var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.map', function () {

	describe('id', function () {

		beforeEach(function () {
			col = imm(records());
			// col2 = imm(recordWithAltId(), '_id');
		})

		it('maps', function() {
			var newCol = col.map(function(record) {
				return record.id;
			});
			expect(newCol).to.eql([10, 11]);
		})

		it('maps', function() {
			var newCol = col.map(function(record) {
				return record;
			});
			expect(newCol[0]).to.eql({id: 10, label: "Sam"});
		})

		it('doest mutate the original values', function () {
			col.map(function(record) {
				record.label = 'LOL';
				return record;
			});
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'});
		})
	})
});
