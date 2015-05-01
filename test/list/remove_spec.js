imm              = require('../../src/imm.ts')
chai             = require('chai')
expect           = chai.expect
records          = require('../fixtures/records')
recordWithAltId  = require('../fixtures/records_with_alt_id')
col = null

describe '.remove', ->

	describe 'id', ->
		beforeEach ->
			col = imm.list(records())
		

		describe 'one', ->
			it 'removes the record', ->
				expect(col.count()).to.eq(2)
				newCol = col.remove(11)
				expect(newCol.count()).to.eq(1)
			

			it 'doesnt modify the original collection', ->
				expect(col.count()).to.eq(2)
				col.remove(11)
				expect(col.count()).to.eq(2)
			

			it 'handles a non existent id', ->
				expect(col.count()).to.eq(2)
				newCol = col.remove(20)
				expect(newCol.count()).to.eq(2)
			

		

		describe 'many', ->

			it 'removes the records', ->
				expect(col.count()).to.eq(2)
				newCol = col.remove([10, 11])
				expect(newCol.count()).to.eq(0)
			

			it 'handles non existent ids', ->
				expect(col.count()).to.eq(2)
				newCol = col.remove([10, 20])
				expect(newCol.count()).to.eq(1)
			

		

		describe 'strict', ->
			it 'throws if records doesnt exist', ->
				expect(col.allExist([10, 12])).to.eq(false)
				expect(->
					col.remove([10, 12], {strict: true
				.to.throw(/do not exist/)
			
		
	

	describe '_id', ->
		beforeEach ->
			col = imm.list(recordWithAltId(), {key: '_id'
		

		describe 'one', ->
			it 'removes the record', ->
				expect(col.count()).to.eq(2)
				col = col.remove('abc')
				expect(col.count()).to.eq(1)
			

		
	

