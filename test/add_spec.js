var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.add', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm(records());
		})

		describe('one', function () {
			it('adds a new record when it has an id', function () {
				expect(col.count()).to.be(2);
				var newCol = col.add({id: 13, label: 'Julia'});
				expect(newCol.count()).to.be(3);
			})

			it('adds when there is no id', function () {
				expect(col.count()).to.be(2);
				var newCol = col.add({label: 'Julia'});
				expect(newCol.count()).to.be(3);
			})

			it('assigns an id if not there', function () {
				col = imm([]);
				var newCol = col.add({label: 'Julia'});
				var records = newCol.array();
				expect(records[0].id).not.to.be(undefined);
			})

			it('replaces an existing record', function () {
				expect(col.count()).to.be(2);
				expect(col.get(10)).to.eql({id: 10, label: 'Sam'});

				var newCol = col.add({id: 10, age: 22});
				expect(newCol.count()).to.be(2);
				expect(newCol.get(10)).to.eql({id: 10, age: 22});
			})

			it('doesnt modify the original collection', function () {
				expect(col.count()).to.be(2);
				col.add({id: 20, label: 'Sam'});
				expect(col.count()).to.be(2);
			})
		})

		describe('many', function () {
			it('adds new records', function () {
				expect(col.count()).to.be(2);
				var records = [{id: 20, label: 'Sam'}, {id: 21, label: 'Sul'}];
				var newCol = col.add(records);
				expect(newCol.count()).to.be(4);
			})

			it('doesnt modify the original collection', function () {
				expect(col.count()).to.be(2);
				var records = [{id: 20, label: 'Sam'}];
				col.add(records);
				expect(col.count()).to.be(2);
			})

			it('returns the same when given an empty array', function () {
				var newCol = col.add([]);
				expect(newCol.count()).to.be(2)
			})
		})

		describe('strict', function () {
			it('throws if record already exists', function () {
				var record1 = {id: 10, label: 'Sam'};
				var record2 = {id: 20, label: 'New'};
				expect(col.anyExist(10)).to.be(true);
				expect(function () {
					col.add([record1, record2], {strict: true});
				}).to.throwError(/already exist/);
			})
		})
	})

	describe('_id', function () {
		beforeEach(function () {
			col = imm(recordWithAltId(), '_id');
		})

		describe('one', function () {

			it('adds a new record when it has an _id', function () {
				expect(col.count()).to.be(2);
				var newCol = col.add({_id: 'ijk', label: 'Julia'});
				expect(col.count()).to.be(2);
				expect(newCol.count()).to.be(3);
			})

			it('replaces existing record', function () {
				expect(col.count()).to.be(2);
				expect(col.get('xyz')).to.eql({_id: 'xyz', label: 'Tess'});

				var newCol = col.add({_id: 'xyz', age: 22});
				expect(newCol.count()).to.be(2);
				expect(newCol.get('xyz')).to.eql({_id: 'xyz', age: 22});
			})
		})
	})


});
