Imm                   = require('../../src/Imm.js')
chai                  = require('chai')
expect                = chai.expect
makeRecords           = require('../fixtures/records')
makeRecordsWithAltId  = require('../fixtures/records_with_alt_id')
col = null


describe '.count', ->

	describe 'id', ->
		beforeEach ->
			col = Imm.List(makeRecords())

		it 'returns the count', ->
			res = col.count()
			expect(res).to.eq(2)

	describe '_id', ->
		beforeEach ->
			col = Imm.List(makeRecordsWithAltId(), {key: '_id'})

		it 'returns the count', ->
			res = col.count()
			expect(res).to.eq(2)
