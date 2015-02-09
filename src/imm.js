

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
		var Immutable = require('seamless-immutable');
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
		var col = Immutable(records);
		return wrap(key, col);
	}

	var isArray = Array.isArray || function(obj) {
		return toString.call(obj) === '[object Array]';
	};

	// @param {Immutable} col
	function wrap(key, immutableArray) {

		checkImmutableArray(immutableArray);	

		key = key || 'id';

		function checkImmutableArray(array) {
			if (!Immutable.isImmutable(array)) throw new Error("Not an immutable array");
		}

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
			// if record doesnt have a key, then return not found
			if (!id) return -1;
			
			var record;
			for (var a=0; a < immutableArray.length; a++) {
				record = immutableArray[a];
				if (record[key] === id) {
					return a;
				}
			}
			return -1;
		}

		function clone(){
			var newCol = immutableArray.slice(0);
			return wrapWithArgs(newCol);
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
				newCol = immutableArray.splice(index, 1, record);
			} else {
				// add record
				newCol = immutableArray.concat([record]);
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
		function add(oneOrMany) {
			if (isArray(oneOrMany)) {
				return addMany(oneOrMany);
			} else {
				return addOne(oneOrMany);
			}	
		}

		function addOne(record) {
			var index = getRecordIndex(record);
			if (index == -1) {
				return set(record);
			} else {
				throw new Error('Record already exists');
			}
		}

		function addMany(records) {
			var newCol = clone();
			for(var a=0; a < records.length; a++) {
				newCol = newCol.add(records[a]);
			}
			return newCol;
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

			var newCol = immutableArray.splice(index, 1, newRecord);
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

			var newCol = immutableArray.splice(index, 1);
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
			var newCol = immutableArray.map(mapper);
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
			var newCol = immutableArray.filter(filterer);
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
			var newCol = immutableArray.sort(sorter);
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
		function count(){
			return immutableArray.length;
		}

		return {
			isImm:       true,
			count:       count,
			get:         get,
			//set:         set,
			add:         add,
			replace:     replace,
			update:      update,
			remove:      remove,
			// find:        col.find.bind(col),
			map:         map,
			filter:      filter,
			sort:        sort,
			// toJS:        col.toJS.bind(col),
			toImmutable: toImmutable,
		};
	}

	return imm;

}));
