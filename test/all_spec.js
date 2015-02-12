var imm              = require('../src/imm');
var Immutable        = require('seamless-immutable');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;

describe('.add', function () {

	describe('id', function () {
		beforeEach(function () {
			col = imm(records());
		})

		it('returns the records', function () {
			var records = col.all();
			expect(records.length).to.be(2)
		})

		it('it is a plain array', function () {
			var records = col.all();
			expect(records).to.be.an('array');
			expect(Immutable.isImmutable(records)).not.to.be(true)
		})

	})


});
