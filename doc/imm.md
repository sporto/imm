

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

## remove(record)

Remove a record.
Removes an existing record based on the id.
Throws if record not found.

```js
collection = collection.remove(id);
```

### Params: 

* **String** *record* id

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

* **Function** *mapper* function

### Return:

* **Imm** modified collection

## filter(filtering)

Filters the collection based on a filtering function.

```js
collection = collection.filter(function (record) { 
  return record.age > 18;
});
```

### Params: 

* **Function** *filtering* function

### Return:

* **Imm** modified collection

## sort(sorting)

Sorts the collection based on a sorting function.

```js
collection = collection.sort(function (record1, record2) { 
  return record1.age > record2.age;
});
```

### Params: 

* **Function** *sorting* function

### Return:

* **Imm** modified collection

## toImmutable()

Returns the underlaying Immutable.js collection

```js
collection = collection.toImmutable();
```

### Return:

* **Immutable** Immutable JS collection

<!-- End src/imm.js -->

