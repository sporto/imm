

<!-- Start src/imm.js -->

## imm(records, [key])

Returns an Imm collection
Keys are always sorted in alphabetical order

```js
var records = [{id: 1, label: 'Sam'}, {...}];
collection = imm(records);
```
imm assumes that the id key is called `id`. You can provide an optional argument:

```js
collection = imm(records, '_id');
```

### Params: 

* **Array** *records* Array of records
* **String** *[key]* Optional name of id key e.g. _id

### Return:

* **Imm** Imm collection

## add(recordOrRecords, [args], [args.strict])

Adds one or more records.
If record already exists then it gets replaced.

```js
// add one record
collection = collection.add(record)

// add many records
collection = collection.add(array)
```

### Params: 

* **Object|Array** *recordOrRecords* Record or records to add
* **Object** *[args]* Optional arguments
* **Boolean** *[args.strict]* Throw if record already exists

### Return:

* **Imm** modified collection

## allExist(idOrIds)

Check if the given id or all given ids exist
Return true if all record exist

### Params: 

* **Number|String|Array** *idOrIds* Id or Ids to check

### Return:

* **Booelan** 

## anyExist(idOrIds)

Check if the given id or any given ids exist
Return true if any ids exist

### Params: 

* **Number|String|Array** *idOrIds* Id or Ids to check

### Return:

* **Booelan** 

## array()

Get all records as a plain JavaScript array
Records in the array are plain mutable JS objects

```js
var records = collection.array();
```

### Return:

* **Array** records

## count()

Returns the records count

```js
count = collection.count();
```

### Return:

* **Number** count

## filter(filterer)

Filters the collection based on a filtering function.

```js
collection = collection.filter(function (record) { 
  return record.age > 18;
});
```

### Params: 

* **Function** *filterer* Filterer function

### Return:

* **Imm** Modified collection

## find(finder)

Finds one record
Returns a plain JS mutable object

```js
var record = collection.find(function (record) { 
  return record.age === 18;
});
```

### Params: 

* **Function** *finder* Finder function

### Return:

* **Object** Record or undefined

## get(id)

Get a record
Returned record is a plain JS mutable object

```js
var record = collection.get(11)
```
Key is expected to be exactly as in the record, e.g. number or string

### Params: 

* **Number|String** *id* Id to get

### Return:

* **Object** record

## map(mapper)

Map the collection through a given function

```js
collection = collection.map(function (record) { 
  return {foo: record.id};
});
```

### Params: 

* **Function** *mapper* Mapping function

### Return:

* **Misc** Anything depending on the mapper

## remove(idOrIds, [args], [args.strict])

Removes one or many records based on the id.
If record is not found then it just gets skipped.

```js
collection = collection.remove(id);
collection = collection.remove(arrayOfIds);
```

### Params: 

* **Number|String|Array** *idOrIds* Id or ids to remove
* **Object** *[args]* Optional arguments
* **Boolean** *[args.strict]* Throw if record(s) doesn't exists

### Return:

* **Imm** modified collection

Replaces one item or many. 
This discards any previous data from the replaced items.
If records doesn't exist then it just gets added

```js
collection = collection.replace(record)
collection = collection.replace(array)
```

### Params: 

* **Object** *recordOrRecords* Record or records to replace

### Return:

* **Imm** modified collection

Updates one record or many. 
This merges the given data with the existing one.
If a record is not found then it gets added.

```js
collection = collection.update(record)
collection = collection.update(array)
```

### Params: 

* **Object|Array** *recordOrRecords* Record or records to update

### Return:

* **Imm** modified collection

<!-- End src/imm.js -->

