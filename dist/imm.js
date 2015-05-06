/**
* Imm
* Immutable collections
* (c) 2015 Sebastian Porto
* MIT license.
* https://github.com/sporto/imm
*/
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

	'use strict';

	var Immutable = __webpack_require__(1);

	if (Immutable == null) throw new Error('Immutable is null');

	function Imm() {
		throw new Error('Using imm directly is deprecated, use imm.list instead');
	}

	Imm.List = __webpack_require__(2)(Immutable);
	Imm.Obj = __webpack_require__(3)(Immutable);

	module.exports = Imm;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var wrapPlainArray = __webpack_require__(4);

	function makeList(Immutable) {

		/**
	 * Returns an Imm list.
	 * Keys are always sorted in alphabetical order.
	 * This means that original order of array given is not respected.
	 *
	 * ### Examples:
	 *
	 * 	var records = [{id: 1, label: 'Sam'}, {...}];
	 * 	var list = Imm.List(records);
	 *
	 * Imm assumes that the id key is called `id`. You can provide an optional argument:
	 *
	 * 	var list = Imm.List(records, {key: '_id'});
	 *
	 * @param {Array} records Array of records
	 * @param {Object} args Optional arguments
	 * @param {String} args.key=id Optional name of id key e.g. _id
	 * @return {Imm.List} Imm List
	 * @api public
	 */
		function List(records, args) {
			return wrapPlainArray(Immutable, args, records);
		}

		return List;
	}

	module.exports = makeList;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var isObject = __webpack_require__(5);
	var isArray = __webpack_require__(6);

	function makeObj(Immutable) {

		/**
	 * Returns an Seamless Immutable object.
	 * See https://github.com/rtfeldman/seamless-immutable#immutable-object
	 *
	 * ### Examples:
	 *
	 * 	var data = {id: 1, label: 'Sam'};
	 * 	var record = Imm.Obj(data);
	 *
	 * To get back a mutable JS object use `asMutable`:
	 *
	 * 	var data = {id: 1, label: 'Sam'};
	 * 	var immutableRecord = Imm.Obj(data);
	 * 	var mutableRecord = immutableRecord.asMutable();
	 *
	 * @param {Object} data A JS object
	 * @return {SeamlessImmutable.Object} Seamless Immutable object
	 * @api public
	 */
		function Obj(data) {
			if (!isObject(data) || isArray(data)) throw new Error('You must provide an object');

			return Immutable(data);
		}

		return Obj;
	}

	module.exports = makeObj;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var wrapImmutableCollection = __webpack_require__(7);
	var getCollectionIdForRecord = __webpack_require__(8);
	// var generateUID             = require('../utils/generateUID.js');
	var mergeDefaults = __webpack_require__(9);
	var assertIsObject = __webpack_require__(10);
	var assertIsPlainArray = __webpack_require__(11);

	var DEFAULT_KEY = 'id';

	/*!
	 * Private
	 *
	 * @param {Array}
	 * @return {Imm.List}
	 * @api private
	 */
	function wrapPlainArray(Immutable, globalArgs, array) {

		if (!array) array = [];

		if (globalArgs) assertIsObject(globalArgs, 'You must provide an object for arguments');

		var defaults = {
			key: DEFAULT_KEY
		};
		globalArgs = mergeDefaults(globalArgs, defaults);

		assertIsPlainArray(Immutable, array);

		// return a immutable object
		var col = Immutable(array).asObject(function (record) {
			var id = record[globalArgs.key];
			var collectionId = getCollectionIdForRecord(record, globalArgs);

			if (!id) {
				var mergable = {};
				mergable.immId = collectionId;
				record = record.merge(mergable);
			}
			return [collectionId, record];
		});

		return wrapImmutableCollection(Immutable, globalArgs, col);
	}

	module.exports = wrapPlainArray;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function isObject(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !!obj;
	}

	module.exports = isObject;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	module.exports = Array.isArray || function (obj) {
		return toString.call(obj) === '[object Array]';
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var assertIsImmutable = __webpack_require__(12);
	var assertIsImmutableInstance = __webpack_require__(13);

	/*!
	 * Private
	 *
	 * param {Immutable}
	 * return {Imm.List}
	 * @api private
	 */
	function wrapImmutableCollection(Immutable, globalArgs, immutableCollection) {

		assertIsImmutable(Immutable, Immutable);
		assertIsImmutableInstance(Immutable, immutableCollection);

		/**
	 * Convert Imm.List to plain JS array.
	 * Records in the array are plain mutable JS objects.
	 *
	 * ### Example:
	 *
	 * 	var list = list.asMutable();
	 *
	 * @return {Array}
	 * @api public
	 */
		function asMutable() {
			return asPlainArray(Immutable, globalArgs, immutableCollection);
		}

		function array() {
			throw new Error('.array is deprecated, use .asMutable instead');
		}

		/**
	 * Convert Imm list to Seamless Immutable array
	 * See https://github.com/rtfeldman/seamless-immutable#immutable-array
	 *
	 * ### Examples:
	 *
	 * 	var list = list.unwrap();
	 *
	 * @return {SeamlessImmutable.Array}
	 * @api public
	 */
		function unwrap() {
			return immutableCollection;
		}

		var add = __webpack_require__(14);
		var asPlainArray = __webpack_require__(15);
		var allExist = __webpack_require__(16);
		var anyExist = __webpack_require__(17);
		var count = __webpack_require__(18);
		var filter = __webpack_require__(19);
		var find = __webpack_require__(20);
		var first = __webpack_require__(21);
		var get = __webpack_require__(22);
		var map = __webpack_require__(23);
		var remove = __webpack_require__(24);
		var reject = __webpack_require__(25);
		var replace = __webpack_require__(26);
		var update = __webpack_require__(27);

		return {
			isImmList: true,
			add: add.bind(null, Immutable, globalArgs, immutableCollection),
			allExist: allExist.bind(null, Immutable, globalArgs, immutableCollection),
			anyExist: anyExist.bind(null, Immutable, globalArgs, immutableCollection),
			asMutable: asMutable,
			array: array,
			count: count.bind(null, Immutable, globalArgs, immutableCollection),
			filter: filter.bind(null, Immutable, globalArgs, immutableCollection),
			find: find.bind(null, Immutable, globalArgs, immutableCollection),
			first: first.bind(null, Immutable, globalArgs, immutableCollection),
			get: get.bind(null, Immutable, globalArgs, immutableCollection),
			replace: replace.bind(null, Immutable, globalArgs, immutableCollection),
			map: map.bind(null, Immutable, globalArgs, immutableCollection),
			reject: reject.bind(null, Immutable, globalArgs, immutableCollection),
			remove: remove.bind(null, Immutable, globalArgs, immutableCollection),
			unwrap: unwrap,
			update: update.bind(null, Immutable, globalArgs, immutableCollection)
		};
	}

	module.exports = wrapImmutableCollection;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var generateUID = __webpack_require__(29);

	function getCollectionIdForRecord(record, globalArgs) {
		var id = record[globalArgs.key];
		if (id) {
			return id;
		} // generate id otherwise
		return generateUID();
	}

	module.exports = getCollectionIdForRecord;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(5);

	function assertIsObject(object, msg) {
		if (!msg) msg = 'Not an object';
		if (!isObject(object)) throw new Error(msg);
	}

	module.exports = assertIsObject;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(6);
	var isImmutableInstance = __webpack_require__(28);

	function assertIsPlainArray(Immutable, array) {
		var one = !isArray(array);
		var two = isImmutableInstance(Immutable, array);
		if (one || two) throw new Error('You must provide an array');
	}

	module.exports = assertIsPlainArray;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isImmutable = __webpack_require__(30);

	function assertIsImmutable(Immutable, object) {
		var is = isImmutable(Immutable, object);
		if (!is) throw new Error('Not Immutable');
	}

	module.exports = assertIsImmutable;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isImmutableInstance = __webpack_require__(28);

	function assertIsImmutableInstance(Immutable, object) {
		var is = isImmutableInstance(Immutable, object);
		if (!is) throw new Error('Not an immutable object');
	}

	module.exports = assertIsImmutableInstance;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var replace = __webpack_require__(26);
	var anyExist = __webpack_require__(17);
	var idsFromRecords = __webpack_require__(31);
	var wrapAsArray = __webpack_require__(32);
	var mergeDefaults = __webpack_require__(9);

	/**
	* Adds one or more records.
	* If record already exists then it gets replaced.
	* If a record doesn't have a key, then the key will be autogenerated.
	*
	* ### Examples:
	*
	* 	// add one
	* 	list = list.add(record)
	*
	* 	// add many records
	* 	list = list.add(array)
	*
	* @param {Object|Array} recordOrRecords Record or records to add
	* @param {Object} args Optional arguments
	* @param {Boolean} args.strict=false Throw if record already exists
	* @return {Imm.List} modified list
	* @api public
	*/
	function add(Immutable, globalArgs, immutableCollection, recordOrRecords, args) {

		var defaults = {
			strict: false
		};
		args = mergeDefaults(args, defaults);

		if (args.strict) {
			// throw if any record exists
			var records = wrapAsArray(recordOrRecords);
			var ids = idsFromRecords(records, globalArgs.key);
			var exists = anyExist(Immutable, globalArgs, immutableCollection, ids);
			if (exists) throw new Error('Some records already exist');
		}
		args.requireKey = false;

		return replace(Immutable, globalArgs, immutableCollection, recordOrRecords, args);
	}

	module.exports = add;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Private
	 *
	 */
	"use strict";

	function asPlainArray(Immutable, globalArgs, immutableCollection) {

		return Object.keys(immutableCollection).map(function (key) {
			return immutableCollection[key].asMutable({ deep: true });
		});
	}

	module.exports = asPlainArray;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var wrapAsArray = __webpack_require__(32);

	/**
	* Check if the given ID or all given IDs exist.
	*
	* ### Examples:
	*
	* 	var exist = list.allExist(21);
	* 	var exist = list.allExist([11, 21]);
	*
	* @param {Number|String|Array} idOrIds ID or IDs to check
	* @return {Boolean}
	* @api public
	*/
	function allExist(Immutable, globalArgs, immutableCollection, idOrIds) {

		var ids = wrapAsArray(idOrIds);
		for (var a = 0; a < ids.length; a++) {
			var id = ids[a];
			if (!immutableCollection[id]) {
				return false;
			}
		}
		return true;
	}

	module.exports = allExist;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var wrapAsArray = __webpack_require__(32);

	/**
	* Check if the given ID or any given IDs exist
	*
	* ### Examples:
	*
	* 	var exist = list.anyExist(21);
	* 	var exist = list.anyExist([11, 21]);
	*
	* @param {Number|String|Array} idOrIds Id or Ids to check
	* @return {Boolean}
	* @api public
	*/
	function anyExist(Immutable, globalArgs, immutableCollection, idOrIds) {

		var ids = wrapAsArray(idOrIds);
		for (var a = 0; a < ids.length; a++) {
			var id = ids[a];
			if (immutableCollection[id]) {
				return true;
			}
		}
		return false;
	}

	module.exports = anyExist;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/**
	* Records count.
	*
	* ### Example:
	*
	* 	count = list.count();
	*
	* @return {Number} count
	* @api public
	*/
	"use strict";

	function count(Immutable, globalArgs, immutableCollection) {

		return Object.keys(immutableCollection).length;
	}

	module.exports = count;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var asPlainArray = __webpack_require__(15);
	var wrapPlainArray = __webpack_require__(4);

	/**
	* Filters the list based on a filtering function.
	* Returns a new Imm modified list
	*
	* ### Example:
	*
	* 	list = list.filter(function(record) {
	* 		return record.age > 18;
	* 	});
	*
	* @param {Function} filterer Filtering function
	* @return {Imm.List} Modified Imm collection
	* @api public
	*/
	function filter(Immutable, globalArgs, immutableCollection, filterer) {

		var newCol = asPlainArray(Immutable, globalArgs, immutableCollection);
		newCol = newCol.filter(filterer);
		return wrapPlainArray(Immutable, globalArgs, newCol);
	}

	module.exports = filter;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var asPlainArray = __webpack_require__(15);

	/**
	* Finds one record.
	* Returns a Seamless Immutable Object
	*
	* ### Example:
	*
	* 	var record = list.find(function (record) {
	* 		return record.age === 18;
	* 	});
	*
	* @param {Function} finder Finder function
	* @return {SeamlessImmutable.Object} record Record or undefined
	* @api public
	*/
	function find(Immutable, globalArgs, immutableCollection, finder) {

		var records = asPlainArray(Immutable, globalArgs, immutableCollection);

		for (var a = 0; a < records.length; a++) {
			var record = records[a];
			if (finder(record)) {
				return Immutable(record);
			}
		}
		return void 0;
	}

	module.exports = find;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/**
	* Get the first record.
	* Order of records in Imm.List is not necessary the order of the records given initially.
	* Returns a Seamless Immutable object.
	* See https://github.com/rtfeldman/seamless-immutable#immutable-object
	*
	* ### Examples:
	*
	* 	var record = list.first()
	*
	* To make object mutable use `asMutable()`
	*
	* 	var record = list.first()
	* 	record = record.asMutable()
	* 	// or
	* 	record = record.asMutable({deep: true})
	*
	* @return {SeamlessImmutale.Object} record
	* @api public
	*/
	"use strict";

	function first(Immutable, globalArgs, immutableCollection) {

		var keys = Object.keys(immutableCollection);
		var firstKey = keys[0];
		var record = immutableCollection[firstKey];
		return record;
	}

	module.exports = first;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/**
	* Get a record by id.
	* Returns a Seamless Immutable object
	* See https://github.com/rtfeldman/seamless-immutable#immutable-object
	*
	* ### Examples:
	*
	* 	var record = list.get(11)
	* 	var record = list.get('11') // same as 11
	*
	* To make object mutable use `asMutable()`
	*
	* 	var record = list.get(11)
	* 	record = record.asMutable()
	* 	// or
	* 	record = record.asMutable({deep: true})
	*
	* @param {Number|String} id Id to fetch
	* @return {SeamlessImmutale.Object} record
	* @api public
	*/
	"use strict";

	function get(Immutable, globalArgs, immutableCollection, id) {
		var record = immutableCollection[id];
		if (!record) {
			return void 0;
		}return record;
	}

	module.exports = get;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var asPlainArray = __webpack_require__(15);

	/**
	* Maps the list through a given function
	*
	* ### Examples:
	*
	* 	list = list.map(function (record) {
	* 		return {foo: record.id};
	* 	});
	*
	* @param {Function} mapper Mapping function
	* @return {Array} array
	* @api public
	*/
	function map(Immutable, globalArgs, immutableCollection, mapper) {

		var keys = Object.keys(immutableCollection);
		return keys.map(function (key) {
			return mapper(immutableCollection[key]);
		});
	}

	module.exports = map;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var idsAsStrings = __webpack_require__(33);
	var allExist = __webpack_require__(16);
	var wrapAsArray = __webpack_require__(32);
	var wrapImmutableCollection = __webpack_require__(7);

	/**
	* Removes one or many records based on the id.
	* If record is not found then it just gets skipped.
	*
	* ### Examples:
	*
	* 	list = list.remove(id);
	* 	list = list.remove(arrayOfIds);
	*
	* @param {Number|String|Array} idOrIds Id or ids to remove
	* @param {Object} args Optional arguments
	* @param {Boolean} args.strict=false Throw if record(s) doesn't exists
	* @return {Imm.List} Modified Imm list
	* @api public
	*/
	function remove(Immutable, globalArgs, immutableCollection, idOrIds, args) {
		var ids = wrapAsArray(idOrIds);

		// ids need to be strings for without
		ids = idsAsStrings(ids);

		if (args && args.strict) {
			var exists = allExist(Immutable, globalArgs, immutableCollection, ids);
			if (!exists) throw new Error('Some records do not exist');
		}

		var newCol = immutableCollection.without(ids);
		return wrapImmutableCollection(Immutable, globalArgs, newCol);
	}

	module.exports = remove;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var asPlainArray = __webpack_require__(15);
	var wrapPlainArray = __webpack_require__(4);
	var negate = __webpack_require__(34);

	/**
	* Rejects records based on a function.
	* Returns a new Imm modified list without those records.
	*
	* ### Example:
	*
	* 	list = list.reject(function(record) {
	* 		return record.age < 18;
	* 	});
	*
	* @param {Function} filterer Filtering function
	* @return {Imm.List} Modified Imm list
	* @api public
	*/
	function reject(Immutable, globalArgs, immutableCollection, filterer) {

		var newCol = asPlainArray(Immutable, globalArgs, immutableCollection);
		newCol = newCol.filter(negate(filterer));
		return wrapPlainArray(Immutable, globalArgs, newCol);
	}

	module.exports = reject;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var idsAsStrings = __webpack_require__(33);
	var idsFromRecords = __webpack_require__(31);
	var getCollectionIdForRecord = __webpack_require__(8);
	var mergeDefaults = __webpack_require__(9);
	var wrapAsArray = __webpack_require__(32);
	var anyExist = __webpack_require__(17);
	var wrapImmutableCollection = __webpack_require__(7);

	/**
	* Replaces one item or many.
	* This discards any previous data from the replaced items.
	* If records doesn't exist then it just gets added.
	* This throws if a record doesn't have an key.
	*
	* ### Examples:
	*
	* 	list = list.replace(record)
	* 	list = list.replace(array)
	*
	* @param {Object} recordOrRecords Record or records to replace
	* @param {Object} args Optional arguments
	* @param {Boolean} args.strict=false Throws if record exist
	* @param {Boolean} args.requireKey=true Throws if record doesn't have a key
	* @return {Imm.List} Modified Imm list
	* @api public
	*/
	function replace(Immutable, globalArgs, immutableCollection, recordOrRecords, args) {

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
			var exists = anyExist(Immutable, globalArgs, immutableCollection, ids);
			if (exists) throw new Error('Some records already exist');
		}

		for (var a = 0; a < records.length; a++) {
			var record = records[a];
			var id = record[globalArgs.key];
			if (args.requireKey && !id) throw new Error('Record must have .' + globalArgs.key);

			var collectionId = getCollectionIdForRecord(record, globalArgs);

			if (!id) {
				record.immId = collectionId;
			}

			merges[collectionId] = record;
		}

		newCol = newCol.merge(merges);

		return wrapImmutableCollection(Immutable, globalArgs, newCol);
	}

	module.exports = replace;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	/*!
	 * Module dependencies.
	 */
	'use strict';

	var idsFromRecords = __webpack_require__(31);
	var wrapAsArray = __webpack_require__(32);
	var mergeDefaults = __webpack_require__(9);
	var anyExist = __webpack_require__(17);
	var wrapImmutableCollection = __webpack_require__(7);

	/**
	* Updates one record or many.
	* This merges the given data with the existing one.
	* If a record is not found then it gets added.
	* This throws if a record doesn't have an key
	*
	* ### Examples:
	*
	* 	list = list.update(record)
	* 	list = list.update(array)
	*
	* @param {Object|Array} recordOrRecords Record or records to update
	* @param {Object} args Optional arguments
	* @param {Boolean} args.strict=false Throws if record exist
	* @return {Imm.List} Modified Imm list
	* @api public
	*/
	function update(Immutable, globalArgs, immutableCollection, recordOrRecords, args) {

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
			var exists = anyExist(Immutable, globalArgs, immutableCollection, ids);
			if (exists) throw new Error('Some records already exist');
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

		return wrapImmutableCollection(Immutable, globalArgs, newCol);
	}

	module.exports = update;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	"use strict";

	function isImmutableInstance(Immutable, object) {
		return Immutable.isImmutable(object);
	}

	module.exports = isImmutableInstance;

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	"use strict";

	function isImmutable(Immutable, object) {
		return object.isImmutable != null;
	}

	module.exports = isImmutable;

/***/ },
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(6);

	function wrapAsArray(recordOrRecords) {
		return isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
	};

	module.exports = wrapAsArray;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function idsAsStrings(array) {
		return array.map(function (v) {
			return '' + v;
		});
	}

	module.exports = idsAsStrings;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function negate(fn) {
		return function () {
			return !fn.apply(this, arguments);
		};
	}

	module.exports = negate;

/***/ }
/******/ ])
});
;