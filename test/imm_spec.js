var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('imm', function(){

	describe('id', function () {

		it('creates an Imm collection', function () {
			col = imm(records());
			expect(col.isImm).to.be(true)
		})

		it('creates a collection', function () {
			col = imm(records());
			expect(col.count()).to.be(2)
		})

		it('is immutable', function () {
			var items = records();
			col = imm(items);

			expect(items[0]).to.eql({id: 10, label: 'Sam'})
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})

			// mutate the original item
			items[0].label = 'Mutated';
			expect(items[0]).to.eql({id: 10, label: 'Mutated'})
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})
		})

		it('throws if not given an array', function () {
			expect(function () {
				imm('A String');
			}).to.throwError();
		})

		it('accepts records without id', function () {
			var records = [{label: 'Julia'}, {label: 'Sam'}];
			var newCol = imm(records);
			expect(newCol.count()).to.be(2);
			expect(newCol.array()[0].id).not.to.be(undefined);
		})

	})

	describe('_id', function () {
		it('takes an optional second args for the id', function(){
			var record = {
				_id: 'xyz',
				label: 'Tess'
			}
			col = imm(recordWithAltId(), '_id');
			expect(col.get('xyz')).to.eql(record);
		})
	})

});