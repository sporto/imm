Immutable        = require('seamless-immutable')
Imm              = require('../../src/imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.get', ->

	describe 'when using id', ->
		beforeEach ->
			col = Imm.List(makeRecords())

		it 'returns the record by id', ->
			record = col.get(11)
			expect(record).to.eql({id: 11, label: 'Tess'})

		it 'returns the record by id as string', ->
			record = col.get('11')
			expect(record).to.eql({id: 11, label: 'Tess'})

		it 'returns an Seamless immutable instance', ->
			record = col.get 11
			expect(Immutable.isImmutable(record)).to.eql(true)

		it 'returns an immutable record', ->
			record = col.get(11)
			expect(record).to.eql({id: 11, label: 'Tess'})
			record.label = 'Julia'
			expect(record).to.eql({id: 11, label: 'Tess'})

		it 'can be made mutable', ->
			record = col.get(11).asMutable()
			expect(record).to.eql({id: 11, label: 'Tess'})
			record.label = 'Julia'
			expect(record).to.eql({id: 11, label: 'Julia'})

		it 'returns a deep plain immutable record', ->
			record = {id: 11, label: 'Sam', numbers: [1, 2]}
			col = Imm.List([record])

			returned = col.get(11)
			expect(returned).to.eql(record)

			fn = ->
				returned.numbers.push(3)
			expect(fn).to.throw()

		it 'can be made deep mutable', ->
			record = {id: 11, label: 'Sam', numbers: [1, 2]}
			col = Imm.List([record])

			returned = col.get(11).asMutable({deep: true})
			expect(returned).to.eql(record)
			expect(returned.numbers.asMutable).to.eq(undefined)

			returned.numbers.push(3)
			expect(returned).to.eql({id: 11, label: 'Sam', numbers: [1, 2, 3]})

		it 'returns undefined if not found', ->
			record = col.get(20)
			expect(record).to.eq(undefined)

		it 'can find a record with an auto generated id', ->
			record1 = {label: 'Sam'}
			record2 = {id: 11, label: 'Julia'}
			# when I create a list with records without an id
			col = Imm.List([record1, record2])
			# and I get the immId of the record
			array = col.asMutable()
			record = array[1]
			immId = record.immId
			# then I should be able to find the record using the immId
			immutableRecord = col.get(immId)
			expect(immutableRecord).to.eql({label: 'Sam', immId: immId})

	describe 'when using _id', ->
		beforeEach ->
			col = Imm.List(recordWithAltId(), {key: '_id'})

		it 'returns the record by _id', ->
			record = col.get('xyz')
			expect(record).to.eql({_id: 'xyz', label: 'Tess'})
