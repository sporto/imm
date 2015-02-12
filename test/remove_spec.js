var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.remove', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm(records());
			col2 = imm(recordWithAltId(), '_id');
		})

		describe('one', function () {
			it('removes the record', function () {
				expect(col.count()).to.be(2);
				var newCol = col.remove(11);
				expect(newCol.count()).to.be(1);
			})

			it('doesnt modify the original collection', function () {
				expect(col.count()).to.be(2);
				col.remove(11);
				expect(col.count()).to.be(2);
			})

			it('throws if record is not found', function () {
				expect(function () {
					col.remove(13);
				}).to.throwError();
			})
		})

		describe('many', function () {

			it('removes the records', function () {
				expect(col.count()).to.be(2);
				var newCol = col.remove([10, 11]);
				expect(newCol.count()).to.be(0);
			})

			it('throws if record is not found', function () {
				expect(function () {
					col.remove([10, 12]);
				}).to.throwError();
			})

		})
	})

	describe('_id', function () {
		beforeEach(function () {
			col = imm(recordWithAltId(), '_id');
		})

		describe('one', function () {
			it('removes the record', function () {
				expect(col2.count()).to.be(2);
				col2 = col2.remove('abc');
				expect(col2.count()).to.be(1);
			})

			it('throws if record is not found', function () {
				expect(function () {
					col2.remove('ijk');
				}).to.throwError();
			})
		})
	})

})