var imm              = require('../src/imm');
var Immutable        = require('seamless-immutable');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.array', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm(records());
		})

		it('returns the records', function () {
			var records = col.array();
			expect(records.length).to.be(2)
		})

		it('returns a plain array', function () {
			var records = col.array();
			expect(records).to.be.an('array');
			expect(Immutable.isImmutable(records)).not.to.be(true)
		})

		it('returns plain mutable js records', function () {
			var records = col.array();
			var record = records[0];
			expect(record).to.eql({id: 10, label: 'Sam'});
			record.label = 'Julia'
			expect(record).to.eql({id: 10, label: 'Julia'});
		})

	})


});
