Immutable        = require 'seamless-immutable'
Imm              = require '../src/imm.js'
chai             = require 'chai'
expect           = chai.expect

describe 'Imm.Obj', ->

	it 'returns an Seamless immutable instance', ->
		data =
			foo: 1
		# When I create an imm obj
		record = Imm.Obj(data)
		# Then it should be an Immutable instance
		expect(Immutable.isImmutable(record)).to.eql(true)

	it 'ignores changes on the original object', ->
		original =
			foo: 1
		immutable = Imm.Obj(original)
		# When I change the original
		original.foo = 2
		# Then the immutable should be the same
		expect(immutable.foo).to.eql(1)

	it 'ignores changes', ->
		original =
			foo: 1
		immutable = Imm.Obj(original)
		# When I try to change it
		immutable.foo = 2
		# Then it should not be changed
		expect(immutable.foo).to.eql(1)
		
	it 'doesnt change the original object', ->
		original =
			foo: 1
		immutable = Imm.Obj(original)
		# When I try to change it
		immutable.foo = 2
		# Then the original should be the same
		expect(original.foo).to.eql(1)

	it 'contains immutable arrays', ->
		original =
			foo: [1, 2]
		obj = Imm.Obj(original)
		fn = ->
			obj.foo.push(3)
		expect(fn).to.throw()

	it 'contains immutable objects', ->
		original =
			foo: {one: 1}
		obj = Imm.Obj(original)
		obj.foo.two = 2

		expected = 
			foo: {one: 1}

		# neither should change
		expect(original).to.eql(expected)
		expect(obj).to.eql(expected)

	it 'throws if given an array', ->
		fn = ->
			Imm.Obj([])

		expect(fn).to.throw()
