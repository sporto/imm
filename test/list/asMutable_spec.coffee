imm                   = require('../../src/imm.js')
Immutable             = require('seamless-immutable')
chai                  = require('chai')
expect                = chai.expect
makeRecords           = require('../fixtures/records')
makeRecordsWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.asMutable', ->

	describe 'id', ->
		beforeEach ->
			col = imm.list(makeRecords())

		it 'returns the records', ->
			records = col.asMutable()
			expect(records.length).to.eq(2)

		it 'returns a plain array', ->
			records = col.asMutable()
			expect(records).to.be.an('array')
			expect(Immutable.isImmutable(records)).not.to.eq(true)

		it 'returns plain mutable js records', ->
			records = col.asMutable()
			record = records[0]
			expect(record).to.eql({id: 10, label: 'Sam'})
			record.label = 'Julia'
			expect(record).to.eql({id: 10, label: 'Julia'})

		it 'returns a deep plain mutable js record', ->
			record = {id: 11, label: 'Sam', numbers: [1, 2]}
			col = imm.list([record])

			returned = col.asMutable()
			expect(returned[0]).to.eql(record)

			returned[0].numbers.push(3)
			expect(returned[0]).to.eql({id: 11, label: 'Sam', numbers: [1, 2, 3]})
