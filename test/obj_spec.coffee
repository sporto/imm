imm              = require('../src/imm.ts')
# imm              = require('../dist/imm')
chai             = require('chai')
expect           = chai.expect

describe 'imm.obj', ->

	it 'creates an immutable object', ->
		obj = imm.obj({})
		expect(obj.isImmObject).to.eq(true)
