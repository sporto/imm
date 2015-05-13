Immutable             = require 'seamless-immutable'
Imm                   = require '../../src/Imm.js'
chai                  = require 'chai'
expect                = chai.expect
makeRecords           = require('../fixtures/records')
makeRecordsWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.unwrap', ->

	describe 'with id', ->

		beforeEach ->
			col = Imm.List(makeRecords())

		it 'returns a Seamless Immutable Object', ->
			result = col.unwrap()
			expect(Immutable.isImmutable(result)).to.eql(true)

			keys = Object.keys(result)
			expect(keys).to.eql(['10', '11']);
