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
			expect(newCol.count()).to.be(2);
			expect(newCol.all()).to.eql([10, 11]);
		});

		it('doesnt modify original objects', function() {
			col.map(function(record) {
				record.foo = 1;
				return record;
			});
			expect(col.get(11)).to.eql({id: 11, label: 'Tess'});
		});

		it('returns an imm collection', function() {
			col = col.map(function(record) {
				return record;
			});
			expect(col.isImm).to.be(true);
		});

		it('doest mutate the original values', function () {
			
		});
	})
});
