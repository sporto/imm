

<!-- Start src/imm.js -->

<!-- End src/imm.js -->




<!-- Start src/list.js -->

## List(records, args, args.key=id)

Returns an Imm list
Keys are always sorted in alphabetical order

### Examples:

	var records = [{id: 1, label: 'Sam'}, {...}];
	collection = Imm.List(records);

Imm assumes that the id key is called `id`. You can provide an optional argument:

	collection = Imm.List(records, {key: '_id'});

### Params:

* **Array** *records* Array of records
* **Object** *args* Optional arguments
* **String** *args.key=id* Optional name of id key e.g. _id

### Return:

* **Imm.List** Imm List

<!-- End src/list.js -->




<!-- Start src/obj.js -->

## Obj(data)

Returns an Seamless Immutable object
See https://github.com/rtfeldman/seamless-immutable#immutable-object

### Examples:

	var data = {id: 1, label: 'Sam'};
	var record = Imm.obj(data);

To get back a mutable JS object use `asMutable`:

	var data = {id: 1, label: 'Sam'};
	var immutableRecord = Imm.obj(data);
	mutableRecord = immutableRecord.asMutable();

### Params:

* **Object** *data* A JS object

### Return:

* **SeamlessImmutable.Object** Seamless Immutable object

<!-- End src/obj.js -->

