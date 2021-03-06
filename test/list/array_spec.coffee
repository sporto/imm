Imm                   = require('../../src/Imm.js')
Immutable             = require('seamless-immutable')
chai                  = require('chai')
expect                = chai.expect
makeRecords           = require('../fixtures/records')
makeRecordsWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.asMutable', ->

	describe 'id', ->
		beforeEach ->
			col = Imm.List(makeRecords())

		it 'returns the records', ->
			fn = ->
				records = col.array()
			expect(fn).to.throw(/deprecated/)