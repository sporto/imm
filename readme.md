Eversame
========

Immutable data collections build on top of immutable.js

Immutable.js is great, but it doesn't have an API that feels right for CRUD applications. Eversame wraps immutable.js to provide a familiar API.
All collections returned by Eversame are immutable as well.

Create a collection
-----------------

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

	var collection = Eversame(record);

Count
-----

	collection.count();

Get a record
------------

	collection.get('11');

This uses the 'id' of the record. All ids are converted to strings.

Test
----

  mocha