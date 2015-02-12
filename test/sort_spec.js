var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;
var col2;

describe('.sort', function () {

	describe('id', function () {

		beforeEach(function () {
			col = imm(records());
			// col2 = imm(recordWithAltId(), '_id');
		})

		it('sorts', function() {
			var newCol = col.sort(function(record1, record2) {
				return record1.id < record2.id;
			});
			var records = newCol.all();
			var expected = [
				{
					id: 11,
					label: 'Tess'
				},
				{
					id: 10,
					label: 'Sam'
				},
			]
			expect(records).to.eql(expected);
		})
	})

});