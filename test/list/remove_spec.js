var imm              = require('../../src/imm');
var chai             = require('chai');
var expect           = chai.expect;
var records          = require('../fixtures/records');
var recordWithAltId  = require('../fixtures/records_with_alt_id');
var col;

describe('.remove', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm.list(records());
		})

		describe('one', function () {
			it('removes the record', function () {
				expect(col.count()).to.eq(2);
				var newCol = col.remove(11);
				expect(newCol.count()).to.eq(1);
			})

			it('doesnt modify the original collection', function () {
				expect(col.count()).to.eq(2);
				col.remove(11);
				expect(col.count()).to.eq(2);
			})

			it('handles a non existent id', function () {
				expect(col.count()).to.eq(2);
				var newCol = col.remove(20);
				expect(newCol.count()).to.eq(2);
			})

		})

		describe('many', function () {

			it('removes the records', function () {
				expect(col.count()).to.eq(2);
				var newCol = col.remove([10, 11]);
				expect(newCol.count()).to.eq(0);
			})

			it('handles non existent ids', function () {
				expect(col.count()).to.eq(2);
				var newCol = col.remove([10, 20]);
				expect(newCol.count()).to.eq(1);
			})

		})

		describe('strict', function () {
			it('throws if records doesnt exist', function () {
				expect(col.allExist([10, 12])).to.eq(false);
				expect(function () {
					col.remove([10, 12], {strict: true});
				}).to.throw(/do not exist/);
			})
		})
	})

	describe('_id', function () {
		beforeEach(function () {
			col = imm.list(recordWithAltId(), {key: '_id'});
		})

		describe('one', function () {
			it('removes the record', function () {
				expect(col.count()).to.eq(2);
				col = col.remove('abc');
				expect(col.count()).to.eq(1);
			})

		})
	})

})