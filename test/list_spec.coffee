Imm              = require('../src/imm.js')
chai             = require('chai')
expect           = chai.expect
records          = require('./fixtures/records')
recordWithAltId  = require('./fixtures/records_with_alt_id')
col = null

describe 'Imm.List', ->

	describe 'id', ->

		it 'creates an Imm list', ->
			col = Imm.List(records())
			expect(col.isImmList).to.eq(true)

		it 'creates a collection', ->
			col = Imm.List(records())
			expect(col.count()).to.eq(2)

		it 'creates a collection without args', ->
			col = Imm.List()
			expect(col.count()).to.eq(0)

		it 'is immutable', ->
			items = records()
			col = Imm.List(items)

			expect(items[0]).to.eql({id: 10, label: 'Sam'})
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})

			# mutate the original item
			items[0].label = 'Mutated'
			expect(items[0]).to.eql({id: 10, label: 'Mutated'})
			expect(col.get(10)).to.eql({id: 10, label: 'Sam'})

		it 'throws if not given an array', ->
			test = () ->
				Imm.List('A String')
			expect(test).to.throw()

		it 'accepts records without id', ->
			records = [{label: 'Julia'}, {label: 'Sam'}]
			newCol = Imm.List(records)
			expect(newCol.count()).to.eq(2)

		it 'doesnt add ids to records without id', ->
			records = [{label: 'Julia'}, {label: 'Sam'}]
			col = Imm.List(records)
			expect(col.asMutable()[0].id).to.eq(undefined)

		it 'adds an immId to records without id', ->
			records = [{label: 'Julia'}, {label: 'Sam'}]
			col = Imm.List(records)
			expect(col.asMutable()[0].immId).not.eq(undefined)

	describe '_id', ->
		it 'takes an optional second args for the id', ->
			record = {
				_id: 'xyz',
				label: 'Tess'
			}
			col = Imm.List(recordWithAltId(), {key: '_id'})
			expect(col.get('xyz')).to.eql(record)
