imm                   = require '../../src/imm.js'
chai                  = require 'chai'
expect                = chai.expect
makeRecords           = require('../fixtures/records')
makeRecordsWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.add', ->

	describe 'id', ->

		beforeEach ->
			col = imm.list(makeRecords())

		describe 'one', ->
			it 'adds a new record when it has an id', ->
				expect(col.count()).to.eq(2)
				newCol = col.add({id: 13, label: 'Julia'})
				expect(newCol.count()).to.eq(3)

			it 'adds when there is no id', ->
				expect(col.count()).to.eq(2)
				newCol = col.add({label: 'Julia'})
				expect(newCol.count()).to.eq(3)

			it 'doesnt add an id to records without id', ->
				col = imm.list([])
				col = col.add({label: 'Julia'})
				records = col.asMutable()
				record = records[0]
				expect(record.id).to.eq(undefined)

			it 'assigns an immId when there is no id', ->
				col = imm.list([])
				col = col.add({label: 'Julia'})
				records = col.asMutable()
				record = records[0]
				console.log(record.immId)
				expect(record.immId).not.to.eq(undefined)

			it 'replaces an existing record', ->
				expect(col.count()).to.eq(2)
				expect(col.get(10)).to.eql({id: 10, label: 'Sam'})

				newCol = col.add({id: 10, age: 22})
				expect(newCol.count()).to.eq(2)
				expect(newCol.get(10)).to.eql({id: 10, age: 22})

			it 'doesnt modify the original collection', ->
				expect(col.count()).to.eq(2)
				col.add({id: 20, label: 'Sam'})
				expect(col.count()).to.eq(2)

		describe 'many', ->
			it 'adds new records', ->
				expect(col.count()).to.eq(2)
				records = [{id: 20, label: 'Sam'}, {id: 21, label: 'Sul'}]
				newCol = col.add(records)
				expect(newCol.count()).to.eq(4)

			it 'doesnt modify the original collection', ->
				expect(col.count()).to.eq(2)
				records = [{id: 20, label: 'Sam'}]
				col.add(records)
				expect(col.count()).to.eq(2)

			it 'returns the same when given an empty array', ->
				newCol = col.add([])
				expect(newCol.count()).to.eq(2)

		describe 'strict', ->
			it 'throws if record already exists', ->
				record1 = {id: 10, label: 'Sam'}
				record2 = {id: 20, label: 'New'}
				expect(col.anyExist(10)).to.eq(true)
				fun = ->
					col.add([record1, record2], {strict: true})
				expect(fun).to.throw(/already exist/)

	describe '_id', ->

		beforeEach ->
			col = imm.list(makeRecordsWithAltId(), {key: '_id'})

		describe 'one', ->

			it 'adds a new record when it has an _id', ->
				expect(col.count()).to.eq(2)
				newCol = col.add({_id: 'ijk', label: 'Julia'})
				expect(col.count()).to.eq(2)
				expect(newCol.count()).to.eq(3)

			it 'replaces existing record', ->
				expect(col.count()).to.eq(2)
				expect(col.get('xyz')).to.eql({_id: 'xyz', label: 'Tess'})

				newCol = col.add({_id: 'xyz', age: 22})

				expect(newCol.count()).to.eq(2)
				expect(newCol.get('xyz')).to.eql({_id: 'xyz', age: 22})
