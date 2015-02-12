var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.update', function () {

	describe('id', function () {

		beforeEach(function () {
			col = imm(records());
		})

		describe('one', function () {
			it('patches an existing record', function () {
				expect(col.count()).to.be(2);
				var newCol = col.update({id: 11, name: 'Maria'});
				expect(newCol.count()).to.be(2);
				expect(newCol.get(11)).to.eql({id: 11, label: 'Tess', name: 'Maria'});
			})

			it('doesnt update the original collection', function () {
				var newCol = col.update({id: 11, name: 'Maria'});
				expect(col.get(11)).to.eql({id: 11, label: 'Tess'});
			})

			it('doesnt throw if there is no existing record', function () {
				expect(function () {
					col.remove({id: 20});
				}).not.to.throwError();
			})

			it('adds a non existing record', function () {
				var record = {id: 20, name: 'Maria'};
				var newCol = col.update(record);
				expect(newCol.count()).to.be(3);
				expect(newCol.get(20)).to.eql(record);
			})
		})

		describe('many', function () {
			it('patches an existing records', function () {
				var record1 = {id: 10, age: 22};
				var record2 = {id: 11, age: 11};
				var records = [record1, record2];
				
				expect(col.count()).to.be(2);

				var newCol = col.update(records);
				expect(newCol.count()).to.be(2);
				expect(newCol.get(10)).to.eql({id: 10, label: 'Sam', age: 22});
				expect(newCol.get(11)).to.eql({id: 11, label: 'Tess', age: 11});
			})

			it('adds non existing records', function () {
				var record1 = {id: 10, age: 22};
				var record2 = {id: 20, age: 11};
				var records = [record1, record2];

				var newCol = col.update(records);
				expect(newCol.count()).to.be(3);
				expect(newCol.get(20)).to.eql(record2);
			})
		})

	})

});