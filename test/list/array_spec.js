var imm              = require('../../src/imm');
var Immutable        = require('seamless-immutable');
var chai             = require('chai');
var expect           = chai.expect;
var records          = require('../fixtures/records');
var recordWithAltId  = require('../fixtures/records_with_alt_id');
var col;

describe('.array', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm.list(records());
		})

		it('returns the records', function () {
			var records = col.array();
			expect(records.length).to.eq(2)
		})

		it('returns a plain array', function () {
			var records = col.array();
			expect(records).to.be.an('array');
			expect(Immutable.isImmutable(records)).not.to.eq(true)
		})

		it('returns plain mutable js records', function () {
			var records = col.array();
			var record = records[0];
			expect(record).to.eql({id: 10, label: 'Sam'});
			record.label = 'Julia'
			expect(record).to.eql({id: 10, label: 'Julia'});
		})

		it('returns a deep plain mutable js record', function () {
			var record = {id: 11, label: 'Sam', numbers: [1, 2]};
			col = imm.list([record]);

			var returned = col.array();
			expect(returned[0]).to.eql(record);

			returned[0].numbers.push(3);
			expect(returned[0]).to.eql({id: 11, label: 'Sam', numbers: [1, 2, 3]});
		})


	})


});
