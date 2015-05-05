Imm              = require('../../src/imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords          = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.update', ->

	describe 'id', ->

		beforeEach ->
			col = Imm.List(makeRecords())

		describe 'one', ->
			it 'patches an existing record', ->
				expect(col.count()).to.eq(2)
				newCol = col.update({id: 11, name: 'Maria'})
				expect(newCol.count()).to.eq(2)
				expect(newCol.get(11)).to.eql({id: 11, label: 'Tess', name: 'Maria'})

			it 'doesnt update the original collection', ->
				newCol = col.update({id: 11, name: 'Maria'})
				expect(col.get(11)).to.eql({id: 11, label: 'Tess'})

			it 'doesnt throw if there is no existing record', ->
				test = ->
					col.update({id: 20})
				expect(test).not.to.throw()

			it 'adds a non existing record', ->
				record = {id: 20, name: 'Maria'}
				newCol = col.update(record)
				expect(newCol.count()).to.eq(3)
				expect(newCol.get(20)).to.eql(record)

			it 'throws if record doesnt have an id', ->
				record = {label: 'Will'}
				fn = ->
					col.update(record)
				expect(fn).to.throw(/must have/)

		describe 'many', ->
			it 'patches an existing records', ->
				record1 = {id: 10, age: 22}
				record2 = {id: 11, age: 11}
				records = [record1, record2]
				
				expect(col.count()).to.eq(2)

				newCol = col.update(records)
				expect(newCol.count()).to.eq(2)
				expect(newCol.get(10)).to.eql({id: 10, label: 'Sam', age: 22})
				expect(newCol.get(11)).to.eql({id: 11, label: 'Tess', age: 11})

			it 'adds non existing records', ->
				record1 = {id: 10, age: 22}
				record2 = {id: 20, age: 11}
				records = [record1, record2]

				newCol = col.update(records)
				expect(newCol.count()).to.eq(3)
				expect(newCol.get(20)).to.eql(record2)

		describe 'strict', ->
			it 'throws if records exist', ->
				record = {id: 10, label: 'Will'}
				expect(col.allExist(10)).to.eq(true)

				fn = ->
					col.update(record, {strict: true})
				expect(fn).to.throw(/already exist/)

