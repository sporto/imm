IMM
========

[ ![Codeship Status for sporto/imm](https://www.codeship.io/projects/c6ea6970-2eac-0132-d151-0605b547a2e8/status)](https://www.codeship.io/projects/39398)

Immutable data collections build on top of [immutable.js](https://github.com/facebook/immutable-js)

Immutable.js is great, but it doesn't have an API that feels right for CRUD applications. Eversame wraps immutable.js to provide a familiar API.
All collections returned by Eversame are immutable as well.

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