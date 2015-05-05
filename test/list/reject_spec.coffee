Imm              = require('../../src/Imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.reject', ->

	describe 'when using id', ->

		beforeEach ->
			col = Imm.List(makeRecords())

		it 'rejects', ->
			col = col.reject (record)->
				record.label == 'Tess'

			expect(col.count()).to.eq(1)
			expect(col.first()).to.eql({id: 10, label: 'Sam'})

		it 'returns an imm collection', ->
			col = col.reject (record)->
				record.label == 'Tess'

			expect(col.isImmList).to.eq(true)

		it 'rejects records without an id', ->
			record1 = {label: 'Sam'}
			record2 = {label: 'Julia'}
			col = Imm.List(makeRecords())

			expect(col.count()).to.eq(2)

			col = col.reject (record)->
				record.label == 'Sam'

			expect(col.count()).to.eq(1)
