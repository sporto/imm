## API
{%= apidocs("../src/list.js") %}
{%= apidocs("../src/obj.js") %}

### Things to note

- Methods that return collections (e.g. filter) return an instance of Imm
- Methods that return one record (e.g. get, find), return a plain JS object
