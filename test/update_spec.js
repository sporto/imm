var imm              = require('../lib/main');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.update', function () {

	beforeEach(function () {
		col1 = imm(records);
		col2 = imm(recordWithAltId, '_id');
	})

	it('patches an existing record', function () {
		expect(col1.count()).to.be(2);
		col1 = col1.update({id: 11, name: 'Maria'});
		expect(col1.count()).to.be(2);
		expect(col1.get(11)).to.eql({id: 11, label: 'Tess', name: 'Maria'});
	})

	it('patches an existing record (_id)', function () {
		expect(col2.count()).to.be(2);
		col2 = col2.update({_id: 'xyz', name: 'Maria'});
		expect(col2.count()).to.be(2);
		expect(col2.get('xyz')).to.eql({_id: 'xyz', label: 'Tess', name: 'Maria'});
	})

	it('throws if there is no existing record', function () {
		expect(function () {
			col1.update({id: 13, label: 'Not there'});
		}).to.throwError();
	})

	it('throws if there is no existing record (_id)', function () {
		expect(function () {
			col2.update({_id: 'ijk', label: 'Not there'});
		}).to.throwError();
	})

});