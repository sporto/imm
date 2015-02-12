var imm              = require('../src/imm');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col;
var col1;
var col2;


describe('.update', function () {

	describe('id', function () {

		beforeEach(function () {
			col = imm(records());
		})

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

		it('throws if there is no existing record', function () {
			expect(function () {
				col.remove({id: 20});
			}).to.throwError();
		})

	})

});