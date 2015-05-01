imm              = require('../../src/imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.map', ->

	describe 'id', ->

		beforeEach ->
			col = imm.list(makeRecords())

		it 'maps', ->
			mapper = (record)->
				record.id
			newCol = col.map(mapper)
			
			expect(newCol).to.eql([10, 11])

		it 'maps', ->
			mapper = (record)->
				record
			newCol = col.map(mapper)
			
			expect(newCol[0]).to.eql({id: 10, label: "Sam"})

		it 'doest mutate the original values', ->
			mapper = (record)->
				record.label = 'LOL'
				record
			col.map(mapper)
			
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})