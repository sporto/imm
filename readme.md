IMM
========

[ ![Codeship Status for sporto/imm](https://www.codeship.io/projects/c6ea6970-2eac-0132-d151-0605b547a2e8/status)](https://www.codeship.io/projects/39398)

Immutable data collections build on top of [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

Seemless-immutable.js is great, but it doesn't have an API that feels right for CRUD applications. 
Imm wraps it to provide a convenient API.

All collections returned by Imm are immutable as well.

Initially this project used [immutable.js](https://github.com/facebook/immutable-js). But unfortunatelly Immutable.js does not create deep immutable object e.g. object inside an array are still mutable.

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