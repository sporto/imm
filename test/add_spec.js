var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;
var col;

describe('.add', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm(records());
		})

		describe('one', function () {
			it('adds a new record when there is no id', function () {
				expect(col.count()).to.be(2);
				col = col.add({label: 'Not ID'});
				expect(col.count()).to.be(3);
			})

			it('adds a new record when it has an id', function () {
				expect(col.count()).to.be(2);
				col = col.add({id: 13, label: 'Julia'});
				expect(col.count()).to.be(3);
			})

			it('throws if there is an existing record', function () {
				expect(function () {
					col.add({id: 11, label: 'Not Tess'});
				}).to.throwError();
			})
		})

		describe('many', function () {
			it('adds new records', function () {
				var records = [{label: 'Sam'}, {label: 'Sul'}];
				var newCol = col.add(records);
				expect(newCol.count()).to.be(4);
			})

			it('doesnt modify the original collection', function () {
				expect(col.count()).to.be(2);
				var records = [{label: 'Sam'}, {label: 'Sul'}];
				col.add(records);
				expect(col.count()).to.be(2);
			})
		})
	})

	describe('_id', function () {
		beforeEach(function () {
			col = imm(recordWithAltId(), '_id');
		})

		describe('one', function () {
			it('adds a new record when there is no _id', function () {
				expect(col.count()).to.be(2);
				col = col.add({label: 'Not ID'});
				expect(col.count()).to.be(3);
			})

			it('adds a new record when it has an _id', function () {
				expect(col.count()).to.be(2);
				var newCol = col.add({_id: 'ijk', label: 'Julia'});
				expect(col.count()).to.be(2);
				expect(newCol.count()).to.be(3);
			})

			it('throws if there is an existing record (_id)', function () {
				expect(function () {
					col.add({_id: 'xyz', label: 'Not Tess'});
				}).to.throwError();
			})
		})
	})


});
