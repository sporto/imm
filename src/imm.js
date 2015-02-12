

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
	* Utility functions
	*/
	var isArray = Array.isArray || function(obj) {
		return toString.call(obj) === '[object Array]';
	};

	function wrapAsArray(oneOrMany) {
		return isArray(oneOrMany) ? oneOrMany : [oneOrMany];
	}

	function arrayContains(array, value) {
		for (var a = 0; a < array.length; a++) {
			if (array[a] === value) return true;
		}
		return false;
	}

	/**
	* Returns an Imm collection
	* 
	* ```js
	* var records = [{id: 1, label: 'Sam'}, {...}];
	* collection = imm(records);
	* ```
	* imm assumes that the id key is called `id`. You can provide an optional argument:
	*
	* ```js
	* collection = imm(records, '_id');
	* ```
	* 
	* @param {Array} Array of records
	* @param {String} [key] Optional name of id key e.g. _id
	* @return {Imm} Imm collection
	* @api public
	*/
	function imm(records, key) {
		if (!isArray(records)) throw new Error("You must provide an array");
		// return a immutable js collection
		var col = Immutable(records);
		return wrap(key, col);
	}

	// @param {Immutable} col
	function wrap(key, immutableArray) {

		checkImmutableArray(immutableArray);	

		key = key || 'id';

		/**
		* Internal utility functions
		*/
		function checkImmutableArray(array) {
			if (!Immutable.isImmutable(array)) throw new Error("Not an immutable array");
		}

		function wrapWithArgs(newCol) {
			return wrap(key, newCol);
		}

		function mergeRecords(oldRecord, newRecord) {
			return oldRecord.merge(newRecord);
		}

		function getRecordIndex(givenRecord) {
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

		/**
		* Get all records
		* This returns a JavaScript array
		* 
		* ```js
		* var records = collection.all();
		* ```
		*
		* @return {Array} records
		* @api public
		*/
		function all() {
			return immutableArray.asMutable();
		}

		/**
		* Get a record
		*
		* ```js
		* var record = collection.get(11)
		* ```
		* Key is expected to be exactly as in the record, e.g. number or string
		*
		* @param {Number or String} id
		* @return {Object} record
		* @api public
		*/
		function get(id) {
			var index = getRecordIndexById(id);
			if (index > -1) {
				return immutableArray[index];
			} else {
				return void(0);
			}
		}

		/**
		* Adds one or more records.
		* Adds a new record if record doesn't have an id or id not found.
		* Throws an error if id already found.
		* 
		* ```js
		* // add one record
		* collection = collection.add(record)
		* // add many records
		* collection = collection.add(array)
		* ```
		*
		* @param {Object or Array} record or records
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
			var newCol;

			if (index == -1) {
				newCol = immutableArray.concat([record]);
			} else {
				throw new Error('Record already exists');
			}

			return wrapWithArgs(newCol);
		}

		function addMany(records) {
			var newCol = immutableArray.asMutable();
			for(var a = 0; a < records.length; a++) {
				var record = records[a];
				// check id?
				newCol.push(record);
			}
			newCol = Immutable(newCol);
			return wrapWithArgs(newCol);
		}

		/**
		* Replaces one item or many. 
		* This discards any previous data from the replaced items.
		* Throws if record / records not found.
		* 
		* ```js
		* collection = collection.replace(record)
		* collection = collection.replace(array)
		* ```
		*
		* @param {Object} record
		* @return {Imm} modified collection
		* @api public
		*/
		function replace(recordOrRecords) {
			var records = wrapAsArray(recordOrRecords);
			var newCol = [];
			var replaced = 0;

			for (var a = 0; a < immutableArray.length; a++) {
				var record = immutableArray[a];
				if (record[key] === recordOrRecords[key]) {
					replaced++;
					newCol.push(recordOrRecords);
				} else {
					newCol.push(record);
				}
			}

			if (replaced != records.length) {
				throw new Error('Record does not exists');
			}

			newCol = Immutable(newCol);
			return wrapWithArgs(newCol);
		}

		/**
		* Updates one record or many. 
		* This merges the given data with the existing one.
		* Throws if record / records not found.
		* 
		* ```js
		* collection = collection.update(record)
		* collection = collection.update(array)
		* ```
		*
		* @param {Object or Array} record / records
		* @return {Imm} modified collection
		* @api public
		*/
		function update(recordOrRecords) {
			// throw if no id
			if (!recordOrRecords[key]) throw new Error('Record must have an id');

			var newCol = [];

			for (var a = 0; a < immutableArray.length; a++) {
				var record = immutableArray[a];
				if (recordOrRecords[key] === record[key]) {
					// merge records
					var merged = mergeRecords(record, recordOrRecords);
					newCol.push(merged);
				} else {
					newCol.push(record);
				}
			}

			newCol = Immutable(newCol);
			return wrapWithArgs(newCol);
		}

		/**
		* Removes one or many records based on the id.
		* Throws if record/records not found.
		* 
		* ```js
		* collection = collection.remove(id);
		* collection = collection.remove(arrayOfIds);
		* ```
		*
		* @param {Number or String or Array} id or ids
		* @return {Imm} modified collection
		* @api public
		*/
		function remove(idOrIds) {
			var ids = wrapAsArray(idOrIds);

			var newCol = [];
			var removed = [];
			for (var a = 0; a < immutableArray.length; a++) {
				var record = immutableArray[a];
				if (arrayContains(ids, record[key])) {
					removed.push(record);
				} else {
					newCol.push(record) ;
				}
			}
			if (removed.length !== ids.length) throw new Error('Not all records found');

			newCol = Immutable(newCol);
			return wrapWithArgs(newCol);
		}

		/**
		* Map the collection through a given function.
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
		* @param {Function} Filterer
		* @return {Imm} Modified collection
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
		* @param {Function} Sorter
		* @return {Imm} Modified collection
		* @api public
		*/
		function sort(sorter) {
			var newCol = immutableArray.asMutable();
			var newCol = newCol.sort(sorter);
			newCol = Immutable(newCol);
			return wrapWithArgs(newCol);
		}

		/**
		* Finds one record
		* 
		* ```js
		* var record = collection.find(function (record) { 
		*   return record.age === 18;
		* });
		* ```
		*
		* @param {Function} Finder
		* @return {Object} Record or undefined
		* @api public
		*/
		function find(finder) {
			for (var a = 0; a < immutableArray.length; a++) {
				var record = immutableArray[a];
				if (finder(record)) {
					return record;
				}
			}
			return void(0);
		}

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
			add:         add,
			all:         all,
			count:       count,
			filter:      filter,
			find:        find,
			get:         get,
			replace:     replace,
			map:         map,
			remove:      remove,
			update:      update,
			sort:        sort,
		};
	}

	return imm;

}));
