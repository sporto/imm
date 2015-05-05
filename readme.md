IMM.js
========

[ ![Codeship Status for sporto/imm](https://www.codeship.io/projects/c6ea6970-2eac-0132-d151-0605b547a2e8/status)](https://www.codeship.io/projects/39398)

__Immutable__ data collections built on top of [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

Seemless-immutable.js is great, but it doesn't have an API that feels right for CRUD applications. 
Imm wraps it to provide a convenient API for CRUD applications. 

For example:

```js
// add one record
list.add(record);

// add many records
list.add(records)

// get one record
list.get(id);

// update one record (patch)
list.update(record);

// remove one record
list.remove(ids);

// remove many records
list.remove(ids);

... many more
```

## Install

### Using NPM

```bash
npm install imm
```

### Browser global

Download `dist/imm.js` or `dist/imm.min.js`

This library requires [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) to be loaded.

## Usage

Create a list by:

```js
var list = Imm.List(records);
```

See the [API docs](./docs/api.md) for all the methods available on List.

Create an object by:

```js
var object = Imm.Obj(record);
```

Imm.Obj just delegates to Seamless Immutable.
See https://github.com/rtfeldman/seamless-immutable#immutable-object

### [API docs](./docs/api.md)

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
