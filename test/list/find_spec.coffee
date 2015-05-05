Immutable        = require('seamless-immutable')
Imm              = require('../../src/imm.js')
chai             = require('chai')
expect           = chai.expect
makeRecords      = require('../fixtures/records')
col = null

describe '.find', ->

	beforeEach ->
		col = Imm.List(makeRecords())

	it 'finds a record using a function', ->
		finder = (v)->
			v.label == 'Tess'
		record = col.find(finder)
		expect(record).to.eql({id: 11, label: 'Tess'})

	it 'returns an immutable object', ->
		finder = (r)->
			true
		record = col.find(finder)
		expect(record).to.eql({id: 10, label: 'Sam'})
		record.label = 'Julia'
		expect(record).to.eql({id: 10, label: 'Sam'})

	it 'returns a Seamless immutable instance', ->
		finder = (r)->
			true
		record = col.find(finder)
		expect(Immutable.isImmutable(record)).to.eq(true)
