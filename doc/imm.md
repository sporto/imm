

<!-- Start src/imm.js -->

## imm(Array, [key])

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

* **Array** *Array* of records
* **String** *[key]* Optional name of id key e.g. _id

### Return:

* **Imm** Imm collection

## add(record)

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

* **ObjectorArray** *record* or records

### Return:

* **Imm** modified collection

## all()

Get all records
This returns a plain JavaScript array
Records in the array are plain mutable JS objects

```js
var records = collection.all();
```

### Return:

* **Array** records

## exist()

Check if the given id or ids exists

### Params:

* **NumberorStringorArray** ** 

### Return:

* **Booelan** 

## count()

Returns the records count

```js
count = collection.count();
```

### Return:

* **Number** count

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

## find(Finder)

Finds one record
Returns a plain JS mutable object

```js
var record = collection.find(function (record) { 
  return record.age === 18;
});
```

### Params:

* **Function** *Finder* 

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

* **NumberorString** *id* 

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

* **Function** *mapper* 

### Return:

* **Misc** 

## remove(id)

Removes one or many records based on the id.
Throws if record/records not found.

```js
collection = collection.remove(id);
collection = collection.remove(arrayOfIds);
```

### Params:

* **NumberorStringorArray** *id* or ids

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

## update(record)

Updates one record or many. 
This merges the given data with the existing one.
Throws if record / records not found.

```js
collection = collection.update(record)
collection = collection.update(array)
```

### Params:

* **ObjectorArray** *record* / records

### Return:

* **Imm** modified collection

<!-- End src/imm.js -->

