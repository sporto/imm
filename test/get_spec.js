var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.get', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm(records());
		})

		it('returns the record by id', function (){
			var record = col.get(11);
			expect(record).to.eql({id: 11, label: 'Tess'});
		})

		it('returns the record by id as string', function (){
			var record = col.get('11');
			expect(record).to.eql({id: 11, label: 'Tess'});
		})

		it('returns plain mutable js record', function () {
			var record = col.get(11);
			expect(record).to.eql({id: 11, label: 'Tess'});
			record.label = 'Julia';
			expect(record).to.eql({id: 11, label: 'Julia'});
		})

		it('returns a deep plain mutable js record', function () {
			var record = {id: 11, label: 'Sam', numbers: [1, 2]};
			col = imm([record]);

			var returned = col.get(11);
			expect(returned).to.eql(record);
			expect(returned.numbers.asMutable).to.be(undefined);

			returned.numbers.push(3);
			expect(returned).to.eql({id: 11, label: 'Sam', numbers: [1, 2, 3]});
		})

		it('returns undefined if not found', function () {
			var record = col.get(20);
			expect(record).to.be(undefined);
		})
	})

	describe('_id', function () {
		beforeEach(function () {
			col = imm(recordWithAltId(), {key: '_id'});
		})

		it('returns the record by _id', function (){
			var record = col.get('xyz');
			expect(record).to.eql({_id: 'xyz', label: 'Tess'});
		})
	})

});
