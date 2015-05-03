__Immutable__ data collections built on top of [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

Seemless-immutable.js is great, but it doesn't have an API that feels right for CRUD applications. 
Imm wraps it to provide a convenient API. For example:

```js
collection.add(record);
collection.get(id);
collection.update(record);
...
```