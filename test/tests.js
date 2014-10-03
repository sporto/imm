var Perpetual = require('../lib/perpetual');
var assert    = require('assert');

describe('Perpetual', function(){

	var records;
	var col;

	beforeEach(function () {
		records = [
			{
		    id: 10,
		    label: 'Sam'
		  },
		  {
		    id: 11,
		    label: 'Test'
		  }
		];
		col = Perpetual(records);
	})

	it('returns a collection', function () {
		// var col = Perpetual(record);
	});

	describe('.count', function () {
		it('returns the count', function (){
			var count = col.count();
			assert.equal(count, 2);
		});
	});

	describe('.get', function () {
		it('gets the record by id', function () {
			var record = col.get('11');

		})
	})

	describe('.find', function () {
		it('finds a record using a function', function () {
			var record = col.find(function (v) { return v.label === 'Test' });

		})
	})

	describe('.set', function () {
		it('adds a new record when there is no id', function () {
			col = col.set({label: 'Not ID'});
		})

		it('adds a new record when it has an id', function () {
			col = col.set({id: 33, label: 'Julia'});
		})

		it('replaces an existing record when it has the same id', function () {
			col = col.set({id: 33, label: 'Not Julia'});
		})
	})

	// add -> set
	describe('.add', function () {
		it('adds a new record when there is no id', function () {
			col = col.set({label: 'Not ID'});
		})

		it('adds a new record when it has an id', function () {
			col = col.set({id: 33, label: 'Julia'});
		})

		it('throws if there is an existing record', function () {

		})
	})

	// replace -> set
	describe('.replace', function () {
		it('replaces an existing record');

		it('throws if there is no existing record', function () {

		})
	})

	describe('.update', function () {
		it('patches an existing record', function () {
			col = col.update({id: 33, name: 'Maria'});
		})

		it('throws if there is no existing record', function () {

		})
	})

	describe('.remove', function () {
		it('removes the record', function () {

		})

		it('returns false if the record is not found', function () {

		})
	})

	describe('.filter', function () {
		
	})

	describe('.sort', function () {
		
	})


})