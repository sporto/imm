imm              = require('../src/imm.js')
chai             = require('chai')
expect           = chai.expect

describe 'imm', ->

	it 'shows a deprecation messages', ->
		fn = ->
			imm([])

		expect(fn).to.throw() 