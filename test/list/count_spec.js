var imm              = require('../../src/imm');
var chai             = require('chai');
var expect           = chai.expect;
var records          = require('../fixtures/records');
var recordWithAltId  = require('../fixtures/records_with_alt_id');
var col;


describe('.count', function () {

	describe('id', function() {
		beforeEach(function () {
			col = imm.list(records());
		})

	it('returns the count', function (){
			var res = col.count();
			expect(res).to.eq(2);
		});
	})

	describe('_id', function() {
		beforeEach(function () {
			col = imm.list(recordWithAltId(), {key: '_id'});
		})

		it('returns the count', function (){
			var res = col.count();
			expect(res).to.eq(2);
		});
	})


});