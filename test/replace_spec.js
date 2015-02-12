var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;


describe('.replace', function () {

	describe('id', function () {

		beforeEach(function () {
			col = imm(records());
		})

		describe('one', function () {
			it('replaces an existing record', function () {
				var record = {id: 11, label: 'New Tess'};
				expect(col.count()).to.be(2);
				var newCol = col.replace(record);
				expect(newCol.count()).to.be(2);
				expect(newCol.get(11)).to.eql(record);
			})

			it('throws if there is no existing record', function () {
				expect(function () {
					col.replace({id: 13, label: 'Not there'});
				}).to.throwError();
			})
		})

		describe('many', function () {
			it('replaces many existing records', function () {
				var record1 = {id: 10, label: 'New Tess'};
				var record2 = {id: 11, label: 'New Sam'};
				var records = [record1, record2];
				expect(col.count()).to.be(2);
				var newCol = col.replace(records);
				expect(newCol.get(10)).to.eql(record1);
				expect(newCol.get(11)).to.eql(record2);
			})
		})

	})

	describe('_id', function () {

		beforeEach(function () {
			col = imm(recordWithAltId(), '_id');
		})

		describe('one', function () {
			it('replaces an existing record (_id)', function () {
				var record = {_id: 'xyz', label: 'New Tess'};
				expect(col.count()).to.be(2);
				col = col.replace(record);
				expect(col.count()).to.be(2);
				expect(col.get('xyz')).to.eql(record);
			})

			it('throws if there is no existing record (_id)', function () {
				expect(function () {
					col.replace({_id: 'ijk', label: 'Not there'});
				}).to.throwError();
			})
		})
	})

});