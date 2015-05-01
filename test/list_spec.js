// var imm              = require('../src/imm');
var imm              = require('../dist/imm');
var chai             = require('chai');
var expect           = chai.expect;
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('imm.list', function(){

	describe('id', function () {

		it('creates an Imm list', function () {
			col = imm.list(records());
			expect(col.isImm).to.eq(true)
		})

		it('creates a collection', function () {
			col = imm.list(records());
			expect(col.count()).to.eq(2)
		})

		it('creates a collection without args', function () {
			col = imm.list();
			expect(col.count()).to.eq(0)
		})

		it('is immutable', function () {
			var items = records();
			col = imm.list(items);

			expect(items[0]).to.eql({id: 10, label: 'Sam'})
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})

			// mutate the original item
			items[0].label = 'Mutated';
			expect(items[0]).to.eql({id: 10, label: 'Mutated'})
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})
		})

		it('throws if not given an array', function () {
			expect(function () {
				imm.list('A String');
			}).to.throw();
		})

		it('accepts records without id', function () {
			var records = [{label: 'Julia'}, {label: 'Sam'}];
			var newCol = imm.list(records);
			expect(newCol.count()).to.eq(2);
			expect(newCol.array()[0].id).not.to.eq(undefined);
		})

	})

	describe('_id', function () {
		it('takes an optional second args for the id', function(){
			var record = {
				_id: 'xyz',
				label: 'Tess'
			}
			col = imm.list(recordWithAltId(), {key: '_id'});
			expect(col.get('xyz')).to.eql(record);
		})
	})

});