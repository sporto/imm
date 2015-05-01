imm              = require('../src/imm.js')
chai             = require('chai')
expect           = chai.expect

describe 'imm.obj', ->

	it 'has immutable arrays', ->
		original =
			foo: [1, 2]
		obj = imm.obj(original)
		fn = ->
			obj.foo.push(3)
		expect(fn).to.throw()

	it 'has immutable objects', ->
		original =
			foo: {one: 1}
		obj = imm.obj(original)
		obj.foo.two = 2

		expected = 
			foo: {one: 1}

		# neither should change
		expect(original).to.eql(expected)
		expect(obj).to.eql(expected)

	it 'throws if given an array', ->
		fn = ->
			imm.obj([])

		expect(fn).to.throw()