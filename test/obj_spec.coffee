Immutable        = require 'seamless-immutable'
imm              = require '../src/imm.js'
chai             = require 'chai'
expect           = chai.expect

describe 'imm.obj', ->

	it 'returns an Seamless immutable instance', ->
		data =
			foo: 1
		# When I create an imm obj
		record = imm.obj(data)
		# Then it should be an Immutable instance
		expect(Immutable.isImmutable(record)).to.eql(true)

	it 'ignores changes on the original object', ->
		original =
			foo: 1
		immutable = imm.obj(original)
		# When I change the original
		original.foo = 2
		# Then the immutable should be the same
		expect(immutable.foo).to.eql(1)

	it 'ignores changes', ->
		original =
			foo: 1
		immutable = imm.obj(original)
		# When I try to change it
		immutable.foo = 2
		# Then it should not be changed
		expect(immutable.foo).to.eql(1)
		
	it 'doesnt change the original object', ->
		original =
			foo: 1
		immutable = imm.obj(original)
		# When I try to change it
		immutable.foo = 2
		# Then the original should be the same
		expect(original.foo).to.eql(1)

	it 'contains immutable arrays', ->
		original =
			foo: [1, 2]
		obj = imm.obj(original)
		fn = ->
			obj.foo.push(3)
		expect(fn).to.throw()

	it 'contains immutable objects', ->
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
