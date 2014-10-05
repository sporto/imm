IMM
========

[ ![Codeship Status for sporto/imm](https://www.codeship.io/projects/c6ea6970-2eac-0132-d151-0605b547a2e8/status)](https://www.codeship.io/projects/39398)

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

	var collection = imm(record);

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