

<!-- Start src/imm.js -->

## isArray

Utility functions

## imm(Array, [key])

Returns an Imm collection

```js
var records = [{id: 1, label: 'Sam'}, {...}];
collection = imm(records);
```
imm assumes that the id key is called `id`. You can provide an optional argument:

```js
collection = imm(records, '_id');
```

### Params: 

* **Array** *Array* of records
* **String** *[key]* Optional name of id key e.g. _id

### Return:

* **Imm** Imm collection

## checkImmutableArray()

Internal utility functions

## all()

Get all records
This returns a JavaScript array

```js
var records = collection.all();
```

### Return:

* **Array** records

## get(or)

Get a record

```js
var record = collection.get(11)
```
Key is expected to be exactly as in the record, e.g. number or string

### Params: 

* **Number** *or* String} id

### Return:

* **Object** record

## add(or)

Adds one or more records.
Adds a new record if record doesn't have an id or id not found.
Throws an error if id already found.

```js
// add one record
collection = collection.add(record)
// add many records
collection = collection.add(array)
```

### Params: 

* **Object** *or* Array} record or records

### Return:

* **Imm** modified collection

## replace(record)

Replaces one item or many. 
This discards any previous data from the replaced items.
Throws if record / records not found.

```js
collection = collection.replace(record)
collection = collection.replace(array)
```

### Params: 

* **Object** *record* 

### Return:

* **Imm** modified collection

## update(or)

Updates one record or many. 
This merges the given data with the existing one.
Throws if record / records not found.

```js
collection = collection.update(record)
collection = collection.update(array)
```

### Params: 

* **Object** *or* Array} record / records

### Return:

* **Imm** modified collection

## remove(or)

Removes one or many records based on the id.
Throws if record/records not found.

```js
collection = collection.remove(id);
collection = collection.remove(arrayOfIds);
```

### Params: 

* **Number** *or* String or Array} id or ids

### Return:

* **Imm** modified collection

## map(mapper)

Map the collection through a given function.

```js
collection = collection.map(function (record) { 
  return {foo: record.id};
});
```

### Params: 

* **Function** *mapper* 

### Return:

* **Imm** modified collection

## filter(Filterer)

Filters the collection based on a filtering function.

```js
collection = collection.filter(function (record) { 
  return record.age > 18;
});
```

### Params: 

* **Function** *Filterer* 

### Return:

* **Imm** Modified collection

## sort(Sorter)

Sorts the collection based on a sorting function.

```js
collection = collection.sort(function (record1, record2) { 
  return record1.age > record2.age;
});
```

### Params: 

* **Function** *Sorter* 

### Return:

* **Imm** Modified collection

## find(Finder)

Finds one record

```js
var record = collection.find(function (record) { 
  return record.age === 18;
});
```

### Params: 

* **Function** *Finder* 

### Return:

* **Object** Record or undefined

## count()

Returns the records count

```js
count = collection.count();
```

### Return:

* **Number** count

<!-- End src/imm.js -->

