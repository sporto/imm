IMM.js
========

[ ![Codeship Status for sporto/imm](https://www.codeship.io/projects/c6ea6970-2eac-0132-d151-0605b547a2e8/status)](https://www.codeship.io/projects/39398)

__Immutable__ data collections built on top of [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

Seemless-immutable.js is great, but it doesn't have an API that feels right for CRUD applications. 
Imm wraps it to provide a convenient API. For example:

```js
collection.add(record);
collection.get(id);
collection.update(record);
...
```

## Install

### Using NPM

```bash
npm install imm
```

### Browser global

Download `dist/imm.js` or `dist/imm.min.js`

This library requires [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) to be loaded.

## API



<!-- Start src/imm.js -->

<!-- End src/imm.js -->




<!-- Start src/list.js -->

## List(records, args, args.key=id)

Returns an Imm list
Keys are always sorted in alphabetical order

### Examples:

	var records = [{id: 1, label: 'Sam'}, {...}];
	var list = Imm.List(records);

Imm assumes that the id key is called `id`. You can provide an optional argument:

	var list = Imm.List(records, {key: '_id'});

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
	var record = Imm.Obj(data);

To get back a mutable JS object use `asMutable`:

	var data = {id: 1, label: 'Sam'};
	var immutableRecord = Imm.Obj(data);
	var mutableRecord = immutableRecord.asMutable();

### Params:

* **Object** *data* A JS object

### Return:

* **SeamlessImmutable.Object** Seamless Immutable object

<!-- End src/obj.js -->




<!-- Start src/list/add.js -->

## add(recordOrRecords, args, args.strict=false)

Adds one or more records.
If record already exists then it gets replaced.
If a record doesn't have a key, then the key will be autogenerated.

### Examples:

	// add one
	list = list.add(record)

	// add many records
	list = list.add(array)

### Params:

* **Object|Array** *recordOrRecords* Record or records to add
* **Object** *args* Optional arguments
* **Boolean** *args.strict=false* Throw if record already exists

### Return:

* **Imm.List** modified list

<!-- End src/list/add.js -->




<!-- Start src/list/allExist.js -->

## allExist(idOrIds)

Check if the given ID or all given IDs exist.

### Examples:

	var exist = list.allExist(21);
	var exist = list.allExist([11, 21]);

### Params:

* **Number|String|Array** *idOrIds* ID or IDs to check

### Return:

* **Boolean** 

<!-- End src/list/allExist.js -->




<!-- Start src/list/anyExist.js -->

## anyExist(idOrIds)

Check if the given ID or any given IDs exist

### Examples:

	var exist = list.anyExist(21);
	var exist = list.anyExist([11, 21]);

### Params:

* **Number|String|Array** *idOrIds* Id or Ids to check

### Return:

* **Boolean** 

<!-- End src/list/anyExist.js -->




<!-- Start src/list/asPlainArray.js -->

<!-- End src/list/asPlainArray.js -->




<!-- Start src/list/count.js -->

## count()

Records count.

### Example:

	count = list.count();

### Return:

* **Number** count

<!-- End src/list/count.js -->




<!-- Start src/list/filter.js -->

## filter(filterer)

Filters the list based on a filtering function.
Returns a new Imm modified list

### Example:

	list = list.filter(function(record) {
		return record.age > 18;
	});

### Params:

* **Function** *filterer* Filtering function

### Return:

* **Imm.List** Modified Imm collection

<!-- End src/list/filter.js -->




<!-- Start src/list/find.js -->

## find(finder)

Finds one record.
Returns a Seamless Immutable Object

### Example:

	var record = list.find(function (record) {
		return record.age === 18;
	});

### Params:

* **Function** *finder* Finder function

### Return:

* **SeamlessImmutable.Object** record Record or undefined

<!-- End src/list/find.js -->




<!-- Start src/list/first.js -->

## first()

Get the first record.
Order of records in Imm.List is not necessary the order of the records given initially.
Returns a Seamless Immutable object.
See https://github.com/rtfeldman/seamless-immutable#immutable-object

### Examples:

	var record = list.first()

To make object mutable use `asMutable()`

	var record = list.first()
	record = record.asMutable()
	// or
	record = record.asMutable({deep: true})

### Return:

* **SeamlessImmutale.Object** record

<!-- End src/list/first.js -->




<!-- Start src/list/get.js -->

## get(id)

Get a record by id.
Returns a Seamless Immutable object
See https://github.com/rtfeldman/seamless-immutable#immutable-object

### Examples:

	var record = list.get(11)
	var record = list.get('11') // same as 11

To make object mutable use `asMutable()`

	var record = list.get(11)
	record = record.asMutable()
	// or
	record = record.asMutable({deep: true})

### Params:

* **Number|String** *id* Id to fetch

### Return:

* **SeamlessImmutale.Object** record

<!-- End src/list/get.js -->




<!-- Start src/list/map.js -->

## map(mapper)

Maps the list through a given function

### Examples:

	list = list.map(function (record) {
		return {foo: record.id};
	});

### Params:

* **Function** *mapper* Mapping function

### Return:

* **Array** array

<!-- End src/list/map.js -->




<!-- Start src/list/reject.js -->

## reject(filterer)

Rejects records based on a function.
Returns a new Imm modified list without those records.

### Example:

	list = list.reject(function(record) {
		return record.age < 18;
	});

### Params:

* **Function** *filterer* Filtering function

### Return:

* **Imm.List** Modified Imm list

<!-- End src/list/reject.js -->




<!-- Start src/list/remove.js -->

## remove(idOrIds, args, args.strict=false)

Removes one or many records based on the id.
If record is not found then it just gets skipped.

### Examples:

	list = list.remove(id);
	list = list.remove(arrayOfIds);

### Params:

* **Number|String|Array** *idOrIds* Id or ids to remove
* **Object** *args* Optional arguments
* **Boolean** *args.strict=false* Throw if record(s) doesn't exists

### Return:

* **Imm.List** Modified Imm list

<!-- End src/list/remove.js -->




<!-- Start src/list/replace.js -->

## replace(recordOrRecords, args, args.strict=false, args.requireKey=true)

Replaces one item or many.
This discards any previous data from the replaced items.
If records doesn't exist then it just gets added.
This throws if a record doesn't have an key.

### Examples:

	list = list.replace(record)
	list = list.replace(array)

### Params:

* **Object** *recordOrRecords* Record or records to replace
* **Object** *args* Optional arguments
* **Boolean** *args.strict=false* Throws if record exist
* **Boolean** *args.requireKey=true* Throws if record doesn't have a key

### Return:

* **Imm.List** Modified Imm list

<!-- End src/list/replace.js -->




<!-- Start src/list/update.js -->

## update(recordOrRecords, args, args.strict=false)

Updates one record or many.
This merges the given data with the existing one.
If a record is not found then it gets added.
This throws if a record doesn't have an key

### Examples:

	list = list.update(record)
	list = list.update(array)

### Params:

* **Object|Array** *recordOrRecords* Record or records to update
* **Object** *args* Optional arguments
* **Boolean** *args.strict=false* Throws if record exist

### Return:

* **Imm.List** Modified Imm list

<!-- End src/list/update.js -->




<!-- Start src/list/wrapImmutableCollection.js -->

## asMutable()

Convert Imm.List to plain JS array.
Records in the array are plain mutable JS objects.

### Example:

	var list = list.asMutable();

### Return:

* **Array** 

## unwrap()

Convert Imm list to Seamless Immutable array
See https://github.com/rtfeldman/seamless-immutable#immutable-array

### Examples:

	var list = list.unwrap();

### Return:

* **SeamlessImmutable.Array** 

<!-- End src/list/wrapImmutableCollection.js -->




<!-- Start src/list/wrapPlainArray.js -->

<!-- End src/list/wrapPlainArray.js -->



## Development

To generate documentation `verb` needs to be installed:

```
npm i -g verb-cli
```

### Testing

```bash
npm install
npm test
```

### Build

This will lint, test, minify and create documentation

```bash
gulp
```

## Related projects

- [immutable.js](https://github.com/facebook/immutable-js)
- [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)