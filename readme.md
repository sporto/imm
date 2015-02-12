IMM.js
========

[ ![Codeship Status for sporto/imm](https://www.codeship.io/projects/c6ea6970-2eac-0132-d151-0605b547a2e8/status)](https://www.codeship.io/projects/39398)

__Immutable__ data collections build on top of [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

Seemless-immutable.js is great, but it doesn't have an API that feels right for CRUD applications. 
Imm wraps it to provide a convenient API. For example:

```js
collection.add(record);
collection.get(id);
collection.update(record);
...
```

Install
-------

### Using NPM

```bash
npm install imm
```

### Browser global

Download `dist/imm.js` or `dist/imm.min.js`

API
-----------------

Please see API [documentation here](./doc/imm.md)

Test
----

```bash
npm install
npm test
```

Build
-----

This will lint, test, minify and create documentation

```bash
gulp
```

Related projects
----------------

- [immutable.js](https://github.com/facebook/immutable-js)
- [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)