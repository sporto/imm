var imm              = require('../../src/imm');
var chai             = require('chai');
var expect           = chai.expect;
var records          = require('../fixtures/records');
var recordWithAltId  = require('../fixtures/records_with_alt_id');
var col;


describe('.filter', function () {

	describe('id', function () {

		beforeEach(function () {
			col = imm.list(records());
		})

		it('filters', function() {
			var newCol = col.filter(function(record) {
				return record.label == 'Tess';
			});
			expect(newCol.count()).to.eq(1);
			expect(newCol.get(11)).to.eql({id: 11, label: 'Tess'});
		})

		it('returns an imm collection', function() {
			col = col.filter(function(record) {
				return record.label == 'Tess';
			});
			expect(col.isImm).to.eq(true);
		})
	})
});
