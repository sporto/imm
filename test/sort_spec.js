var imm              = require('../lib/main');
var expect           = require('expect.js');
var records          = require('./fixtures/records');
var recordWithAltId  = require('./fixtures/records_with_alt_id');
var col1;
var col2;


describe('.sort', function () {

	beforeEach(function () {
		col1 = imm(records);
		col2 = imm(recordWithAltId, '_id');
	})


});