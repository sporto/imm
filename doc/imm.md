

<!-- Start src/imm.js -->

## imm(array, [key])

Returns an Imm collection

```js
collection = imm([{id: 1, label: 'Sam'}, {...}]);
```
imm assumes that the id key is called `id`. You can provide an optional argument:

```js
collection = imm(records, '_id');
```

### Params: 

* **Array** *array* of records
* **String** *[key]* Optional name of id key

### Return:

* **Immutable** Imm collection

## get(id)

Get a record

```js
var record = collection.get('11')
```

### Params: 

* **String** *id* 

### Return:

* **Object** record

## set(record)

Set record.
Adds a new record if record doesn't have an id or id not found.
Replaces an existing record if already found.

```js
collection = collection.set({id: 11, label: 'Sam'})
```

### Params: 

* **Object** *record* 

### Return:

* **Imm** modified collection

## add(record)

Add a record.
Adds a new record if record doesn't have an id or id not found.
Throws an error if id already found.

```js
collection = collection.add({id: 11, label: 'Sam'})
```

### Params: 

* **Object** *record* 

### Return:

* **Imm** modified collection

## replace(record)

Replace a record.
Replaces an existing record based on the id.
Throws if record not found.

```js
collection = collection.replace({id: 11, label: 'Sam'})
```

### Params: 

* **Object** *record* 

### Return:

* **Imm** modified collection

## update(record)

Update a record.
Patches an existing record based on the id.
Throws if record not found.

```js
collection = collection.update({id: 11, label: 'Sam'})
```

### Params: 

* **Object** *record* 

### Return:

* **Imm** modified collection

## remove(id)

Remove a record.
Removes an existing record based on the id.
Throws if record not found.

```js
collection = collection.remove(id);
```

### Params: 

* **String** *id* 

### Return:

* **Imm** modified collection

## map(mapper)

Map the collection through a given function.
Caveat: If you modify the record in the map, the original object get modified.

```js
collection = collection.map(function (record) { 
  return {foo: record.id};
});
```

### Params: 

* **Function** *mapper* 

### Return:

* **Imm** modified collection

## filter(filterer)

Filters the collection based on a filtering function.

```js
collection = collection.filter(function (record) { 
  return record.age > 18;
});
```

### Params: 

* **Function** *filterer* 

### Return:

* **Imm** modified collection

## sort(sorter)

Sorts the collection based on a sorting function.

```js
collection = collection.sort(function (record1, record2) { 
  return record1.age > record2.age;
});
```

### Params: 

* **Function** *sorter* 

### Return:

* **Imm** modified collection

## find(finder)

Finds a returns a record.

```js
var record = collection.find(function (record) { 
  return record.age === 18;
});
```

### Params: 

* **Function** *finder* 

### Return:

* **Object** record

## toImmutable()

Returns the underlaying Immutable.js collection

```js
collection = collection.toImmutable();
```

### Return:

* **Immutable** Immutable JS collection

## toJS()

Returns the collection as a JS Array

```js
records = collection.toJS();
```

### Return:

* **Array** JS Array

## count()

Returns the records count

```js
count = collection.count();
```

### Return:

* **Number** count

<!-- End src/imm.js -->

