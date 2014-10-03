var Eversame = require('../lib/main');
var expect   = require('expect.js');

describe('Eversame', function(){

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
				label: 'Tess'
		  }
		];
		col = Eversame(records);
	})

	it('returns a collection', function () {
		// var col = Eversame(record);
	});

	describe('.count', function () {
		it('returns the count', function (){
			var count = col.count();
			expect(count).to.be(2);
		});
	});

	describe('.get', function () {
		it('gets the record by id', function () {
			var record = col.get('11');
			expect(record).not.to.be(undefined);
			expect(record).to.eql({id: 11, label: 'Tess'});
		})
	})

	describe('.find', function () {
		it('finds a record using a function', function () {
			var record = col.find(function (v) { return v.label === 'Tess' });
			expect(record).to.eql({id: 11, label: 'Tess'});
		})
	})

	describe('.set', function () {
		it('adds a new record when there is no id', function () {
			expect(col.count()).to.be(2);
			col = col.set({label: 'Not ID'});
			expect(col.count()).to.be(3);
		});

		it('adds a new record when it has an id', function () {
			expect(col.count()).to.be(2);
			col = col.set({id: 13, label: 'Julia'});
			expect(col.count()).to.be(3);
		});

		it('replaces an existing record when it has the same id', function () {
			var record = {id: 11, label: 'Not Tess'};
			expect(col.count()).to.be(2);
			col = col.set(record);
			expect(col.count()).to.be(2);
			expect(col.get(11)).to.eql(record);
		});
	})

	// add -> set
	describe('.add', function () {
		it('adds a new record when there is no id', function () {
			expect(col.count()).to.be(2);
			col = col.add({label: 'Not ID'});
			expect(col.count()).to.be(3);
		});

		it('adds a new record when it has an id', function () {
			expect(col.count()).to.be(2);
			col = col.add({id: 13, label: 'Julia'});
			expect(col.count()).to.be(3);
		});

		it('throws if there is an existing record', function () {
			expect(function () {
				col.add({id: 11, label: 'Not Tess'});
			}).to.throwError();
		});
	})

	// replace -> set
	describe('.replace', function () {
		it('replaces an existing record', function () {
			var record = {id: 11, label: 'New Tess'};
			expect(col.count()).to.be(2);
			col = col.replace(record);
			expect(col.count()).to.be(2);
			expect(col.get(11)).to.eql(record);
		});

		it('throws if there is no existing record', function () {
			expect(function () {
				col.replace({id: 13, label: 'Not there'});
			}).to.throwError();
		});
	})

	describe('.update', function () {
		it('patches an existing record', function () {
			expect(col.count()).to.be(2);
			col = col.update({id: 11, name: 'Maria'});
			expect(col.count()).to.be(2);
			expect(col.get(11)).to.eql({id: 11, label: 'Tess', name: 'Maria'});
		})

		it('throws if there is no existing record', function () {
			expect(function () {
				col.update({id: 13, label: 'Not there'});
			}).to.throwError();
		})
	})

	describe('.remove', function () {
		it('removes the record', function () {
			expect(col.count()).to.be(2);
			col = col.remove({id: 11});
			expect(col.count()).to.be(1);
		})

		it('throws if record is not found', function () {
			expect(function () {
				col.remove({id: 13, label: 'Not there'});
			}).to.throwError();
		});
	})

	describe('.filter', function () {
		
	})

	describe('.sort', function () {
		
	})


})