Imm              = require('../../src/Imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.filter', ->

	describe 'when using id', ->

		beforeEach ->
			col = Imm.List(makeRecords())

		it 'filters', ->
			newCol = col.filter (record)->
				record.label == 'Tess'

			expect(newCol.count()).to.eq(1)
			expect(newCol.get(11)).to.eql({id: 11, label: 'Tess'})

		it 'returns an imm collection', ->
			col = col.filter (record)->
				record.label == 'Tess'

			expect(col.isImmList).to.eq(true)
