

// CommonJS + AMD + Global boilerplate
// https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js


(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['Immutable'], function (Immutable) {
			return (root.imm = factory(Immutable));
		});
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		var Immutable = require('immutable');
		module.exports = factory(Immutable);
	} else {
		// Browser globals
		root.imm = factory(root.Immutable);
	}
}(this, function (Immutable) {

	if (Immutable == null) throw new Error('Immutable is null');

	/**
	* Returns an Imm collection
	* 
	* ```js
	* collection = imm([{id: 1, label: 'Sam'}, {...}]);
	* ```
	* imm assumes that the id key is called `id`. You can provide an optional argument:
	*
	* ```js
	* collection = imm(records, '_id');
	* ```
	* 
	* @param {Array} array of records
	* @param {String} [key] Optional name of id key
	* @return {Immutable} Imm collection
	* @api public
	*/

	function imm(records, key) {
		if (!isArray(records)) throw new Error("You must provide an array");
		// return a immutable js collection
		var col = Immutable.Sequence(records).valueSeq();
		return wrap(key, col);
	}

	var isArray = Array.isArray || function(obj) {
		return toString.call(obj) === '[object Array]';
	};

	function wrap(key, col) {

		key = key || 'id';

		function wrapWithArgs(newCol) {
			return wrap(key, newCol);
		}

		function mergeRecords(oldRecord, newRecord) {
			var oldMap = Immutable.Map(oldRecord);
			var newMap = Immutable.Map(newRecord);
			return oldMap.mergeDeep(newRecord).toJS();
		}

		function getRecordIndex(givenRecord) {
			// if (!givenRecord.id) throw new Error('Record must have an id');
			return getRecordIndexById(givenRecord[key]);
		}

		function getRecordIndexById(id) {
			return col.findIndex(function(record) {
				return record[key] == id;
			});
		}

		/**
		* Get a record
		*
		* ```js
		* var record = collection.get('11')
		* ```
		*
		* @param {String} id
		* @return {Object} record
		* @api public
		*/
		function get(id) {
			return col.find(function(v) {
				return v[key] == id;
			});
		}

		/**
		* Set record.
		* Adds a new record if record doesn't have an id or id not found.
		* Replaces an existing record if already found.
		* 
		* ```js
		* collection = collection.set({id: 11, label: 'Sam'})
		* ```
		*
		* @param {Object} record
		* @return {Imm} modified collection
		* @api public
		*/
		function set(record) {
			var newCol;
			var index = getRecordIndex(record);

			if (index > -1) {
				// replace record
				newCol = col.splice(index, 1, record);
			} else {
				// add record
				newCol = col.concat([record]);
			}

			return wrapWithArgs(newCol);
		}

		/**
		* Add a record.
		* Adds a new record if record doesn't have an id or id not found.
		* Throws an error if id already found.
		* 
		* ```js
		* collection = collection.add({id: 11, label: 'Sam'})
		* ```
		*
		* @param {Object} record
		* @return {Imm} modified collection
		* @api public
		*/
		function add(record) {
			var index = getRecordIndex(record);
			if (index == -1) {
				return set(record);
			} else {
				throw new Error('Record already exists');
			}
		}

		/**
		* Replace a record.
		* Replaces an existing record based on the id.
		* Throws if record not found.
		* 
		* ```js
		* collection = collection.replace({id: 11, label: 'Sam'})
		* ```
		*
		* @param {Object} record
		* @return {Imm} modified collection
		* @api public
		*/
		function replace(record) {
			var index = getRecordIndex(record);
			if (index == -1) {
				throw new Error('Record does not exists');
			} else {
				return set(record);
			}
		}

		/**
		* Update a record.
		* Patches an existing record based on the id.
		* Throws if record not found.
		* 
		* ```js
		* collection = collection.update({id: 11, label: 'Sam'})
		* ```
		*
		* @param {Object} record
		* @return {Imm} modified collection
		* @api public
		*/
		function update(record) {
			// throw if no id
			if (!record[key]) throw new Error('Record must have an id');

			// find the original index
			var index = getRecordIndex(record);

			if (index == -1) throw new Error("Record not found");

			// get the old record
			var oldRecord = col.get(index);
			var newRecord = mergeRecords(oldRecord, record);

			var newCol = col.splice(index, 1, newRecord);
			return wrapWithArgs(newCol);
		}

		/**
		* Remove a record.
		* Removes an existing record based on the id.
		* Throws if record not found.
		* 
		* ```js
		* collection = collection.remove(id);
		* ```
		*
		* @param {String} id
		* @return {Imm} modified collection
		* @api public
		*/
		function remove(id) {
			var index = getRecordIndexById(id);
			if (index == -1) throw new Error("Record not found");

			var newCol = col.splice(index, 1);
			return wrapWithArgs(newCol);
		}

		/**
		* Map the collection through a given function.
		* Caveat: If you modify the record in the map, the original object get modified.
		* 
		* ```js
		* collection = collection.map(function (record) { 
		*   return {foo: record.id};
		* });
		* ```
		*
		* @param {Function} mapper 
		* @return {Imm} modified collection
		* @api public
		*/
		function map(mapper) {
			var newCol = col.map(mapper);
			return wrapWithArgs(newCol);
		}

		/**
		* Filters the collection based on a filtering function.
		* 
		* ```js
		* collection = collection.filter(function (record) { 
		*   return record.age > 18;
		* });
		* ```
		*
		* @param {Function} filterer
		* @return {Imm} modified collection
		* @api public
		*/
		function filter(filterer) {
			var newCol = col.filter(filterer);
			return wrapWithArgs(newCol);
		}

		/**
		* Sorts the collection based on a sorting function.
		* 
		* ```js
		* collection = collection.sort(function (record1, record2) { 
		*   return record1.age > record2.age;
		* });
		* ```
		*
		* @param {Function} sorter
		* @return {Imm} modified collection
		* @api public
		*/
		function sort(sorter) {
			var newCol = col.sort(sorter);
			return wrapWithArgs(newCol);
		}

		/**
		* Finds a returns a record.
		* 
		* ```js
		* var record = collection.find(function (record) { 
		*   return record.age === 18;
		* });
		* ```
		*
		* @param {Function} finder
		* @return {Object} record
		* @api public
		*/
		function find() {}

		/**
		* Returns the underlaying Immutable.js collection
		* 
		* ```js
		* collection = collection.toImmutable();
		* ```
		*
		* @return {Immutable} Immutable JS collection
		* @api public
		*/
		function toImmutable() {
			return col;
		}

		/**
		* Returns the collection as a JS Array
		* 
		* ```js
		* records = collection.toJS();
		* ```
		*
		* @return {Array} JS Array
		* @api public
		*/
		function toJS(){}

		/**
		* Returns the records count
		* 
		* ```js
		* count = collection.count();
		* ```
		*
		* @return {Number} count
		* @api public
		*/
		function count(){}

		return {
			isImm:       true,
			count:       col.count.bind(col),
			get:         get,
			set:         set,
			add:         add,
			replace:     replace,
			update:      update,
			remove:      remove,
			find:        col.find.bind(col),
			map:         map,
			filter:      filter,
			sort:        sort,
			toJS:        col.toJS.bind(col),
			toImmutable: toImmutable,
		};
	}

	return imm;

}));