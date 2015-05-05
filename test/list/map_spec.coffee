Immutable        = require('seamless-immutable')
Imm              = require('../../src/Imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.map', ->

	describe 'id', ->

		beforeEach ->
			col = Imm.List(makeRecords())

		it 'maps', ->
			mapper = (record)->
				record.id
			col = col.map(mapper)
			
			expect(col).to.eql([10, 11])

		it 'maps', ->
			mapper = (record)->
				record
			col = col.map(mapper)

			expect(col[0]).to.eql({id: 10, label: "Sam"})

		it 'feeds an immutable', ->
			mapped = 0
			mapper = (record) ->
				mapped++
				expect(Immutable.isImmutable(record)).to.eql(true)
				record
			col = col.map(mapper)
			expect(mapped).to.eql(2)

		it 'doest mutate the original values', ->
			mapper = (record)->
				record.label = 'LOL'
				record
			col.map(mapper)

			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})
