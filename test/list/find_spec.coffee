imm              = require('../../src/imm.ts')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
col = null

describe '.find', ->

	beforeEach ->
		col = imm.list(makeRecords())

	it 'finds a record using a function', ->
		finder = (v)->
			v.label == 'Tess'
		record = col.find(finder)
		expect(record).to.eql({id: 11, label: 'Tess'})

	it 'returns a mutable object', ->
		finder = (r)->
			true
		record = col.find(finder)
		expect(record).to.eql({id: 10, label: 'Sam'})
		record.label = 'Julia'
		expect(record).to.eql({id: 10, label: 'Julia'})
