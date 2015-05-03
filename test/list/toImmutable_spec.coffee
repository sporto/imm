Immutable             = require 'seamless-immutable'
imm                   = require '../../src/imm.js'
chai                  = require 'chai'
expect                = chai.expect
makeRecords           = require('../fixtures/records')
makeRecordsWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.toImmutable', ->

	describe 'with id', ->

		beforeEach ->
			col = imm.list(makeRecords())

		it 'returns a Seamless Immutable list', ->
			result = col.toImmutable()
			expect(Immutable.isImmutable(result)).to.eql(true)
