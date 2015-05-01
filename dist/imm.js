(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("seamless-immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["seamless-immutable"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("seamless-immutable")) : factory(root["seamless-immutable"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	//! Imm
	//! Immutable collections
	//! (c) 2015 Sebastian Porto
	//! MIT license.
	//! https://github.com/sporto/imm

	'use strict';

	var Immutable = __webpack_require__(1);

	if (Immutable == null) throw new Error('Immutable is null');

	function imm() {
		console.warn('Using imm directly is deprecated, use imm.list instead');
	}

	imm.list = __webpack_require__(2)(Immutable);
	imm.obj = __webpack_require__(3)(Immutable);

	module.exports = imm;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	var isArray = __webpack_require__(5);
	var wrapAsArray = __webpack_require__(6);
	// var arrayContains         = require('./utils/arrayContains.js');
	var mergeDefaults = __webpack_require__(7);
	var generateUID = __webpack_require__(8);
	var idsAsStrings = __webpack_require__(9);
	var idsFromRecords = __webpack_require__(10);
	var assertIsObject = __webpack_require__(11);
	var assertIsPlainArray = __webpack_require__(12);
	var assertIsImmutable = __webpack_require__(13);

	function makeList(Immutable) {
		var DEFAULT_KEY = 'id';

		/**
	 * Returns an Imm list
	 * Keys are always sorted in alphabetical order
	 *
	 * **Example**
	 *
	 * ```js
	 * var records = [{id: 1, label: 'Sam'}, {...}];
	 * collection = imm.list(records);
	 * ```
	 * imm assumes that the id key is called `id`. You can provide an optional argument:
	 *
	 * ```js
	 * collection = imm.list(records, {key: '_id'});
	 * ```
	 *
	 * @param {Array} records Array of records
	 * @param {Object} args Optional arguments
	 * @param {String} args.key=id Optional name of id key e.g. _id
	 * @return {Imm.list} Imm list
	 * @api public
	 */
		function list(records, args) {
			return _wrapPlainArray(records, args);
		}

		/**
	 * @param {Array}
	 * @return {Imm}
	 */
		function _wrapPlainArray(array, args) {
			var id;
			var mergable;
			if (!array) array = [];

			if (args) assertIsObject(args, 'You must provide an object for arguments');

			var defaults = {
				key: DEFAULT_KEY
			};
			args = mergeDefaults(args, defaults);

			assertIsPlainArray(Immutable, array);

			// return a immutable object
			var col = Immutable(array).asObject(function (record) {
				id = record[args.key];
				if (!id) {
					id = generateUID();
					mergable = {};
					mergable[args.key] = id;
					record = record.merge(mergable);
				}
				return [id, record];
			});

			return _wrapImmutableCollection(col, args);
		}

		/*
	 * @param {Immutable}
	 * @return {Imm}
	 */
		function _wrapImmutableCollection(immutableCollection, globalArgs) {

			assertIsImmutable(Immutable, immutableCollection);

			function _wrapPlainArrayWithArgs(array) {
				return _wrapPlainArray(array, globalArgs);
			}

			function _wrapImmutableCollectionWithArgs(immutableCollection) {
				return _wrapImmutableCollection(immutableCollection, globalArgs);
			}

			/**
	  * Adds one or more records.
	  * If record already exists then it gets replaced.
	  * If a record doesn't have a key, then the key will be autogenerated.
	  *
	  * **Example**
	  *
	  * ```js
	  * // add one
	  * collection = collection.add(record)
	  *
	  * // add many records
	  * collection = collection.add(array)
	  * ```
	  *
	  * @param {Object|Array} recordOrRecords Record or records to add
	  * @param {Object} args Optional arguments
	  * @param {Boolean} args.strict=false Throw if record already exists
	  * @return {Imm} modified collection
	  * @api public
	  */
			function add(recordOrRecords, args) {
				var defaults = {
					strict: false
				};
				args = mergeDefaults(args, defaults);

				if (args.strict) {
					// throw if any record exists
					var records = wrapAsArray(recordOrRecords);
					var ids = idsFromRecords(records, globalArgs.key);
					if (anyExist(ids)) throw new Error('Some records already exist');
				}
				args.requireKey = false;
				return replace(recordOrRecords, args);
			}

			/**
	  * Check if the given ID or all given IDs exist.
	  *
	  * **Example**
	  *
	  * ```js
	  * var exist = allExist(21);
	  * var exist = allExist([11, 21]);
	  * ```
	  *
	  * @param {Number|String|Array} idOrIds ID or IDs to check
	  * @return {Boolean}
	  * @api public
	  */
			function allExist(idOrIds) {
				var ids = wrapAsArray(idOrIds);
				for (var a = 0; a < ids.length; a++) {
					var id = ids[a];
					if (!immutableCollection[id]) {
						return false;
					}
				}
				return true;
			}

			/**
	  * Check if the given ID or any given IDs exist
	  *
	  * **Example**
	  *
	  * ```js
	  * var exist = anyExist(21);
	  * var exist = anyExist([11, 21]);
	  * ```
	  *
	  * @param {Number|String|Array} idOrIds Id or Ids to check
	  * @return {Boolean}
	  * @api public
	  */
			function anyExist(idOrIds) {
				var ids = wrapAsArray(idOrIds);
				for (var a = 0; a < ids.length; a++) {
					var id = ids[a];
					if (immutableCollection[id]) {
						return true;
					}
				}
				return false;
			}

			/**
	  * Get all records.
	  * Records in the array are plain mutable JS objects.
	  *
	  * **Example**
	  *
	  * ```js
	  * var records = collection.array();
	  * ```
	  *
	  * @return {Array} records Plain array with records
	  * @api public
	  */
			function array() {
				return asPlainArray();
			}

			function asPlainArray() {
				return Object.keys(immutableCollection).map(function (key) {
					return immutableCollection[key].asMutable({ deep: true });
				});
			}

			/**
	  * Records count.
	  *
	  * **Example**
	  *
	  * ```js
	  * count = collection.count();
	  * ```
	  *
	  * @return {Number} count
	  * @api public
	  */
			function count() {
				return Object.keys(immutableCollection).length;
			}

			/**
	  * Filters the collection based on a filtering function.
	  *
	  * **Example**
	  *
	  * ```js
	  * collection = collection.filter(function (record) {
	  *   return record.age > 18;
	  * });
	  * ```
	  *
	  * @param {Function} filterer Filtering function
	  * @return {Imm} Modified collection
	  * @api public
	  */
			function filter(filterer) {
				var newCol = asPlainArray();
				newCol = newCol.filter(filterer);
				return _wrapPlainArrayWithArgs(newCol);
			}

			/**
	  * Finds one record.
	  * Returns a plain JS mutable object.
	  *
	  * **Example**
	  *
	  * ```js
	  * var record = collection.find(function (record) {
	  *   return record.age === 18;
	  * });
	  * ```
	  *
	  * @param {Function} finder Finder function
	  * @return {Object} record Record or undefined
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
				return void 0;
			}

			/**
	  * Get a record.
	  * Returned record is a plain JS mutable object.
	  *
	  * **Example**
	  *
	  * ```js
	  * var record = collection.get(11)
	  * var record = collection.get('11') // same as 11
	  * ```
	  *
	  * @param {Number|String} id Id to fetch
	  * @return {Object} record
	  * @api public
	  */
			function get(id) {
				var record = immutableCollection[id];
				if (!record) {
					return void 0;
				}return record.asMutable({ deep: true });
			}

			/**
	  * Map the collection through a given function
	  *
	  * **Example**
	  *
	  * ```js
	  * collection = collection.map(function (record) {
	  *   return {foo: record.id};
	  * });
	  * ```
	  *
	  * @param {Function} mapper Mapping function
	  * @return {Array} array
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
	  * **Example**
	  *
	  * ```js
	  * collection = collection.remove(id);
	  * collection = collection.remove(arrayOfIds);
	  * ```
	  *
	  * @param {Number|String|Array} idOrIds Id or ids to remove
	  * @param {Object} args Optional arguments
	  * @param {Boolean} args.strict=false Throw if record(s) doesn't exists
	  * @return {Imm} Modified collection
	  * @api public
	  */
			function remove(idOrIds, args) {
				var ids = wrapAsArray(idOrIds);

				// ids need to be strings for without
				ids = idsAsStrings(ids);

				if (args && args.strict) {
					if (!allExist(ids)) throw new Error('Some records do not exist');
				}

				var newCol = immutableCollection.without(ids);
				return _wrapImmutableCollectionWithArgs(newCol);
			}

			/**
	  * Replaces one item or many.
	  * This discards any previous data from the replaced items.
	  * If records doesn't exist then it just gets added.
	  * This throws if a record doesn't have an key.
	  *
	  * **Example**
	  *
	  * ```js
	  * collection = collection.replace(record)
	  * collection = collection.replace(array)
	  * ```
	  *
	  * @param {Object} recordOrRecords Record or records to replace
	  * @param {Object} args Optional arguments
	  * @param {Boolean} args.strict=false Throws if record exist
	  * @param {Boolean} args.requireKey=true Throws if record doesn't have a key
	  * @return {Imm} Modified Imm collection
	  * @api public
	  */
			function replace(recordOrRecords, args) {
				var record;
				var id;
				var records = wrapAsArray(recordOrRecords);
				var ids = idsFromRecords(records, globalArgs.key);
				ids = idsAsStrings(ids);
				var newCol = immutableCollection.without(ids);
				var merges = {};
				var defaults = {
					strict: false,
					requireKey: true
				};
				args = mergeDefaults(args, defaults);

				if (args.strict) {
					// throw if any record exists
					if (anyExist(ids)) throw new Error('Some records already exist');
				}

				for (var a = 0; a < records.length; a++) {
					record = records[a];
					id = record[globalArgs.key];
					if (!id) {
						if (args.requireKey) throw new Error('Record must have .' + globalArgs.key);
						id = generateUID();
						record[globalArgs.key] = id;
					}
					if (!id) throw new Error('Record must have .' + globalArgs.key);
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
	  * This throws if a record doesn't have an key
	  *
	  * **Example**
	  *
	  * ```js
	  * collection = collection.update(record)
	  * collection = collection.update(array)
	  * ```
	  *
	  * @param {Object|Array} recordOrRecords Record or records to update
	  * @param {Object} args Optional arguments
	  * @param {Boolean} args.strict=false Throws if record exist
	  * @return {Imm} Modified collection
	  * @api public
	  */
			function update(recordOrRecords, args) {
				var defaults = {
					strict: false
				};
				args = mergeDefaults(args, defaults);

				var givenId;
				var givenRecord;
				var toMerge;
				var existing;
				var mergedRecord;
				var givenRecords = wrapAsArray(recordOrRecords);
				var newCol = immutableCollection;

				if (args.strict) {
					// throw if any record exists
					var records = wrapAsArray(recordOrRecords);
					var ids = idsFromRecords(records, globalArgs.key);
					if (anyExist(ids)) throw new Error('Some records already exist');
				}

				for (var a = 0; a < givenRecords.length; a++) {
					givenRecord = givenRecords[a];
					givenId = givenRecord[globalArgs.key];
					// throw if no givenId
					if (!givenId) throw new Error('Record must have .' + globalArgs.key);

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

			return {
				isImmList: true,
				add: add,
				allExist: allExist,
				anyExist: anyExist,
				array: array,
				count: count,
				filter: filter,
				find: find,
				get: get,
				replace: replace,
				map: map,
				remove: remove,
				toImmutable: toImmutable,
				update: update
			};
		}

		return list;
	}

	module.exports = makeList;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	var isObject = __webpack_require__(4);
	var isArray = __webpack_require__(5);

	function makeObj(Immutable) {

		/**
	 * Returns an Seamless Immutable object
	 *
	 * **Example**
	 *
	 * ```js
	 * var data = {id: 1, label: 'Sam'};
	 * var record = imm.obj(data);
	 * ```
	 *
	 * @param {Object} data A JS object
	 * @return {Immutable} Immutable object
	 * @api public
	 */
		function obj(data) {
			if (!isObject(data) || isArray(data)) throw new Error('You must provide an object');

			return Immutable(data);
		}

		return obj;
	}

	module.exports = makeObj;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function isObject(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !!obj;
	}

	module.exports = isObject;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	module.exports = Array.isArray || function (obj) {
		return toString.call(obj) === '[object Array]';
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(5);

	function wrapAsArray(recordOrRecords) {
		return isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
	};

	module.exports = wrapAsArray;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// Fill in a given object with default properties.
	// http://underscorejs.org/#defaults
	"use strict";

	function defaults(obj) {
		obj = obj || {};
		for (var i = 1, length = arguments.length; i < length; i++) {
			var source = arguments[i];
			for (var prop in source) {
				if (obj[prop] === void 0) obj[prop] = source[prop];
			}
		}
		return obj;
	}

	module.exports = defaults;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function generateUID() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : r & 3 | 8).toString(16);
		});
		return uuid;
	}

	module.exports = generateUID;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function idsAsStrings(array) {
		return array.map(function (v) {
			return '' + v;
		});
	}

	module.exports = idsAsStrings;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	function idsFromRecords(array, key) {
		if (!key) throw new Error('Must provide a key');
		return array.map(function (record) {
			return record[key];
		});
	}

	module.exports = idsFromRecords;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(4);

	function assertIsObject(object, msg) {
		if (!msg) msg = 'Not an object';
		if (!isObject(object)) throw new Error(msg);
	}

	module.exports = assertIsObject;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(5);
	var isImmutable = __webpack_require__(14);

	function assertIsPlainArray(Immutable, array) {
		var one = !isArray(array);
		var two = isImmutable(Immutable, array);
		if (one || two) throw new Error('You must provide an array');
	}

	module.exports = assertIsPlainArray;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isImmutable = __webpack_require__(14);

	function assertIsImmutable(Immutable, object) {
		var is = isImmutable(Immutable, object);
		if (!is) throw new Error('Not an immutable object');
	}

	module.exports = assertIsImmutable;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function isImmutable(Immutable, object) {
		return Immutable.isImmutable(object);
	}

	module.exports = isImmutable;

/***/ }
/******/ ])
});
;