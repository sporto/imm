//! Imm
//! Immutable collections
//! (c) 2015 Sebastian Porto
//! MIT license.
//! https://github.com/sporto/imm


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

	"use strict";

	if (Immutable == null) throw new Error('Immutable is null');

	var DEFAULT_KEY = 'id';

	// Utility functions
	var _isArray = Array.isArray || function(obj) {
		return toString.call(obj) === '[object Array]';
	};

	function _wrapAsArray(recordOrRecords) {
		return _isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
	}

	function _idsAsStrings(array) {
		return array.map(function (v) {
			return "" + v;
		});
	}

	function _idsFromRecords(array, key) {
		if (!key) throw new Error("Must provide a key");
		return array.map(function (record) {
			return record[key];
		});
	}

	function _arrayContains(array, value) {
		for (var a = 0; a < array.length; a++) {
			if (array[a] === value) return true;
		}
		return false;
	}

	function _isImmutable(object) {
		return Immutable.isImmutable(object);
	}

	function _checkIsImmutable(object) {
		var is = _isImmutable(object);
		if (!is) throw new Error("Not an immutable object");
	}

	function _checkIsPlainArray(array) {
		var one = !_isArray(array);
		var two = _isImmutable(array);
		if (one || two) throw new Error("You must provide an array");
	}

	/**
	* Returns an Imm collection
	* Keys are always sorted in alphabetical order
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
	* @param {Array} records Array of records
	* @param {String} [key] Optional name of id key e.g. _id
	* @return {Imm} Imm collection
	* @api public
	*/
	function imm(records, key) {
		return _wrapPlainArray(records, key);
	}

	// @param {Array}
	// @return {Imm}
	function _wrapPlainArray(array, key) {
		_checkIsPlainArray(array);

		key = key || DEFAULT_KEY;

		// return a immutable object
		var col = Immutable(array).asObject(function (record) {
			return [record[key], record];
		});

		return _wrapImmutableCollection(col, key);
	}

	// @param {Immutable}
	// @return {Imm}
	function _wrapImmutableCollection(immutableCollection, key) {

		_checkIsImmutable(immutableCollection);

		key = key || DEFAULT_KEY;

		function _wrapPlainArrayWithArgs(array) {
			return _wrapPlainArray(array, key);
		}

		function _wrapImmutableCollectionWithArgs(immutableCollection) {
			return _wrapImmutableCollection(immutableCollection, key);
		}

		/**
		* Adds one or more records.
		* If record already exists then it gets replaced.
		* 
		* ```js
		* // add one record
		* collection = collection.add(record)
		*
		* // add many records
		* collection = collection.add(array)
		* ```
		*
		* @param {Object|Array} recordOrRecords Record or records to add
		* @param {Object} [args] Optional arguments
		*   @param {Boolean} [args.strict] Throw if record already exists
		* @return {Imm} modified collection
		* @api public
		*/
		function add(recordOrRecords, args) {
			if (args && args.strict) {
				// throw if any record exists
				var records = _wrapAsArray(recordOrRecords);
				var ids     = _idsFromRecords(records, key);
				if (exist(ids)) throw new Error('Some records already exist');
			}
			return replace(recordOrRecords);
		}

		function addThrow(recordOrRecords) {
			var records = _wrapAsArray(recordOrRecords);
			var id, record, toMerge, existing;

			if (records.length === 0) return _wrapImmutableCollectionWithArgs(immutableCollection);

			var newCol = immutableCollection;

			for (var a = 0; a < records.length; a++) {
				record = records[a];
				id     = record[key];
				if (!id) throw new Error("Invalid key");
				existing = get(id);
				if (existing) throw new Error('Record already exists');
				toMerge = {};
				toMerge[id] = record;
				newCol = newCol.merge(toMerge);
			}

			return _wrapImmutableCollectionWithArgs(newCol);
		}

		/**
		* Get all records as a plain JavaScript array
		* Records in the array are plain mutable JS objects
		* 
		* ```js
		* var records = collection.array();
		* ```
		*
		* @return {Array} records
		* @api public
		*/
		function array() {
			return asPlainArray();
		}

		function asPlainArray() {
			return Object.keys(immutableCollection).map(function (key) {
				return immutableCollection[key].asMutable();
			});
		}

		/**
		* Check if the given id or ids exists
		*
		* @param {Number|String|Array} idOrIds Id or Ids to check
		* @return {Booelan}
		* @api public
		*/
		function exist(idOrIds) {
			var ids = _wrapAsArray(idOrIds);
			for (var a = 0; a < ids.length; a++) {
				var id = ids[a];
				if (!immutableCollection[id]) return false;
			}
			return true;
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
			return Object.keys(immutableCollection).length;
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
		* @param {Function} filterer Filterer function
		* @return {Imm} Modified collection
		* @api public
		*/
		function filter(filterer) {
			var newCol = asPlainArray();
			newCol = newCol.filter(filterer);
			return _wrapPlainArrayWithArgs(newCol);
		}

		/**
		* Finds one record
		* Returns a plain JS mutable object
		* 
		* ```js
		* var record = collection.find(function (record) { 
		*   return record.age === 18;
		* });
		* ```
		*
		* @param {Function} finder Finder function
		* @return {Object} Record or undefined
		* @api public
		*/
		function find(finder) {
			var records = asPlainArray();
			for (var a = 0; a < records.length; a++) {
				var record = records[a];
				if (finder(record)) {
					return record;
				}
			}
			return void(0);
		}

		/**
		* Get a record
		* Returned record is a plain JS mutable object
		*
		* ```js
		* var record = collection.get(11)
		* ```
		* Key is expected to be exactly as in the record, e.g. number or string
		*
		* @param {Number|String} id Id to get
		* @return {Object} record
		* @api public
		*/
		function get(id) {
			var record = immutableCollection[id];
			if (!record) return void(0);
			return record.asMutable();
		}

		/**
		* Map the collection through a given function
		* 
		* ```js
		* collection = collection.map(function (record) { 
		*   return {foo: record.id};
		* });
		* ```
		*
		* @param {Function} mapper Mapping function
		* @return {Misc} Anything depending on the mapper
		* @api public
		*/
		function map(mapper) {
			var newCol = asPlainArray();
			return newCol.map(mapper);
		}

		/**
		* Removes one or many records based on the id.
		* If record is not found then it just gets skipped.
		* 
		* ```js
		* collection = collection.remove(id);
		* collection = collection.remove(arrayOfIds);
		* ```
		*
		* @param {Number|String|Array} idOrIds Id or ids to remove
		* @return {Imm} modified collection
		* @api public
		*/
		function remove(idOrIds) {
			var ids = _wrapAsArray(idOrIds);

			// ids need to be strings for without
			ids = _idsAsStrings(ids);

			var newCol = immutableCollection.without(ids);
			return _wrapImmutableCollectionWithArgs(newCol);
		}

		function removeThrow(idOrIds) {
			var ids = _wrapAsArray(idOrIds);

			if (!exist(ids)) throw new Error('Not all records found');

			// ids need to be strings for without
			ids = _idsAsStrings(ids);

			var newCol = immutableCollection.without(ids);
			return _wrapImmutableCollectionWithArgs(newCol);
		}

		/**
		* Replaces one item or many. 
		* This discards any previous data from the replaced items.
		* If records doesn't exist then it just gets added
		* 
		* ```js
		* collection = collection.replace(record)
		* collection = collection.replace(array)
		* ```
		*
		* @param {Object} recordOrRecords Record or records to replace
		* @return {Imm} modified collection
		* @api public
		*/
		function replace(recordOrRecords) {
			var record, id;
			var records = _wrapAsArray(recordOrRecords);
			var ids = _idsFromRecords(records, key);
			ids = _idsAsStrings(ids);
			var newCol = immutableCollection.without(ids);
			var merges = {};

			for (var a = 0; a < records.length; a++) {
				record = records[a];
				id = record[key];
				if (!id) throw new Error("Record must have ." + key);
				merges[id] = record;
			}

			newCol = newCol.merge(merges);

			return _wrapImmutableCollectionWithArgs(newCol);
		}

		function replaceThrow(recordOrRecords) {
			var record, id, existing;
			var records = _wrapAsArray(recordOrRecords);
			var ids = _idsFromRecords(records, key);
			ids = _idsAsStrings(ids);
			var newCol = immutableCollection.without(ids);
			var merges = {};

			for (var a = 0; a < records.length; a++) {
				record = records[a];
				id = record[key];
				existing = get(id);
				if (!existing) throw new Error('Record ' + id + ' does not exists');
				merges[id] = record;
			}

			newCol = newCol.merge(merges);

			return _wrapImmutableCollectionWithArgs(newCol);
		}

		function toImmutable() {
			return immutableCollection;
		}

		/**
		* Updates one record or many. 
		* This merges the given data with the existing one.
		* If a record is not found then it gets added.
		* 
		* ```js
		* collection = collection.update(record)
		* collection = collection.update(array)
		* ```
		*
		* @param {Object|Array} recordOrRecords Record or records to update
		* @return {Imm} modified collection
		* @api public
		*/
		function update(recordOrRecords) {
			var givenId, givenRecord, toMerge, existing, mergedRecord;
			var givenRecords = _wrapAsArray(recordOrRecords);
			var newCol = immutableCollection;

			for (var a = 0; a < givenRecords.length; a++) {
				givenRecord = givenRecords[a];
				givenId = givenRecord[key];
				// throw if no givenId
				if (!givenId) throw new Error('Record must have .' + key);

				existing = immutableCollection[givenId];
				if (existing) {
					mergedRecord = existing.merge(givenRecord);
				} else {
					mergedRecord = givenRecord;
				}

				toMerge = {};
				toMerge[givenId] = mergedRecord;

				newCol = newCol.merge(toMerge);
			}

			return _wrapImmutableCollectionWithArgs(newCol);
		}

		function updateThrow(recordOrRecords) {
			var givenId, givenRecord, toMerge, existing;
			var givenRecords = _wrapAsArray(recordOrRecords);
			var newCol = immutableCollection;

			for (var a = 0; a < givenRecords.length; a++) {
				givenRecord = givenRecords[a];
				givenId = givenRecord[key];
				// throw if no givenId
				if (!givenId) throw new Error('Record must have .' + key);

				existing = immutableCollection[givenId];
				if (!existing) throw new Error('Record not found ' + givenId);

				existing = existing.merge(givenRecord);

				toMerge = {};
				toMerge[givenId] = existing;

				newCol = newCol.merge(toMerge);
			}

			return _wrapImmutableCollectionWithArgs(newCol);
		}

		return {
			isImm:       true,
			add:         add,
			array:       array,
			count:       count,
			exist:       exist,
			filter:      filter,
			find:        find,
			get:         get,
			replace:     replace,
			map:         map,
			remove:      remove,
			toImmutable: toImmutable,
			update:      update,
		};
	}

	return imm;

}));
