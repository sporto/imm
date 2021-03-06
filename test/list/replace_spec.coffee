Imm              = require('../../src/Imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null


describe '.replace', ->

	describe 'id', ->

		beforeEach ->
			col = Imm.List(makeRecords())

		describe 'one', ->
			it 'replaces an existing record', ->
				record = {id: 11, label: 'New Tess'}
				expect(col.count()).to.eq(2)
				newCol = col.replace(record)
				expect(newCol.count()).to.eq(2)
				expect(newCol.get(11)).to.eql(record)

			it 'takes an immutable', ->
				expect(col.count()).to.eq(2)
				record = {id: 11, label: 'New Tess'}
				record = Imm.Obj(record)
				col = col.replace(record)
				expect(col.count()).to.eq(2)

			it 'adds a no existing record', ->
				record = {id: 20, label: 'Will'}
				newCol = col.replace(record)
				expect(newCol.count()).to.eq(3)

			it 'throws if record doesnt have an id', ->
				record = {label: 'Will'}
				test = ->
					col.replace(record)
				expect(test).to.throw(/must have/)

		describe 'many', ->
			it 'replaces many existing records', ->
				record1 = {id: 10, label: 'New Tess'}
				record2 = {id: 11, label: 'New Sam'}
				records = [record1, record2]
				expect(col.count()).to.eq(2)

				newCol = col.replace(records)
				expect(newCol.get(10)).to.eql(record1)
				expect(newCol.get(11)).to.eql(record2)

			it 'adds non existing records', ->
				record1 = {id: 10, label: 'New Tess'}
				record2 = {id: 20, label: 'Will'}
				records = [record1, record2]

				newCol = col.replace(records)
				expect(newCol.count()).to.eq(3)

			it 'takes immutables', ->
				expect(col.count()).to.eq(2)
				record1 = {id: 10, label: 'New Tess'}
				record2 = {id: 20, label: 'Will'}
				records = [record1, record2]
				records = Imm.Array(records)

				col = col.replace(records)

				expect(col.count()).to.eq(3)

			it 'takes an Imm.List', ->
				expect(col.count()).to.eq(2)
				record1 = {id: 10, label: 'New Tess'}
				record2 = {id: 20, label: 'Will'}
				records = [record1, record2]
				records = Imm.List(records)

				col = col.add(records)

				expect(col.count()).to.eq(3)

		describe 'strict', ->
			it 'throws if records exist', ->
				record = {id: 10, label: 'Will'}
				expect(col.allExist(10)).to.eq(true)
				test = ->
					col.replace(record, {strict: true})
				expect(test).to.throw(/already exist/)

	describe 'with _id', ->

		beforeEach ->
			col = Imm.List(recordWithAltId(), {key: '_id'})

		describe 'one', ->
			it 'replaces an existing record (_id)', ->
				record = {_id: 'xyz', label: 'New Tess'}
				expect(col.count()).to.eq(2)
				col = col.replace(record)
				expect(col.count()).to.eq(2)
				expect(col.get('xyz')).to.eql(record)
