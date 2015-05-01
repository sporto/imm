imm              = require('../../src/imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.get', ->

	describe 'id', ->
		beforeEach ->
			col = imm.list(makeRecords())

		it 'returns the record by id', ->
			record = col.get(11)
			expect(record).to.eql({id: 11, label: 'Tess'})

		it 'returns the record by id as string', ->
			record = col.get('11')
			expect(record).to.eql({id: 11, label: 'Tess'})

		it 'returns plain mutable js record', ->
			record = col.get(11)
			expect(record).to.eql({id: 11, label: 'Tess'})
			record.label = 'Julia'
			expect(record).to.eql({id: 11, label: 'Julia'})

		it 'returns a deep plain mutable js record', ->
			record = {id: 11, label: 'Sam', numbers: [1, 2]}
			col = imm.list([record])

			returned = col.get(11)
			expect(returned).to.eql(record)
			expect(returned.numbers.asMutable).to.eq(undefined)

			returned.numbers.push(3)
			expect(returned).to.eql({id: 11, label: 'Sam', numbers: [1, 2, 3]})

		it 'returns undefined if not found', ->
			record = col.get(20)
			expect(record).to.eq(undefined)

	describe '_id', ->
		beforeEach ->
			col = imm.list(recordWithAltId(), {key: '_id'})

		it 'returns the record by _id', ->
			record = col.get('xyz')
			expect(record).to.eql({_id: 'xyz', label: 'Tess'})