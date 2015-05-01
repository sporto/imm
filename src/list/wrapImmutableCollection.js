/* @flow */

var assertIsImmutable           = require('../assertions/isImmutable.js');
var assertIsImmutableInstance   = require('../assertions/isImmutableInstance.js');

var add          = require('./add.js');
var asPlainArray = require('./asPlainArray.js');
var allExist     = require('./allExist.js');
var anyExist     = require('./anyExist.js');
var count        = require('./count.js');
var filter       = require('./filter.js');
var find         = require('./find.js');
var get          = require('./get.js');
var map          = require('./map.js');
var remove       = require('./remove.js');
var replace      = require('./replace.js');
var update       = require('./update.js');

// var isArray             = require('../utils/isArray.js');
// var wrapAsArray         = require('../utils/wrapAsArray.js');




/*
* @param {Immutable}
* @return {Imm}
*/
function wrapImmutableCollection(Immutable: any, globalArgs: Object, immutableCollection: any): Object {

	assertIsImmutable(Immutable, Immutable);
	assertIsImmutableInstance(Immutable, immutableCollection);

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
	function array(): Array<any> {
		return asPlainArray(Immutable, globalArgs, immutableCollection);
	}

	function toImmutable() {
		return immutableCollection;
	}

	return {
		isImmList:   true,
		add:         add.bind(null, Immutable, globalArgs, immutableCollection),
		allExist:    allExist.bind(null, Immutable, globalArgs, immutableCollection),
		anyExist:    anyExist.bind(null, Immutable, globalArgs, immutableCollection),
		array:       array,
		count:       count.bind(null, Immutable, globalArgs, immutableCollection),
		filter:      filter.bind(null, Immutable, globalArgs, immutableCollection),
		find:        find.bind(null, Immutable, globalArgs, immutableCollection),
		get:         get.bind(null, Immutable, globalArgs, immutableCollection),
		replace:     replace.bind(null, Immutable, globalArgs, immutableCollection),
		map:         map.bind(null, Immutable, globalArgs, immutableCollection),
		remove:      remove.bind(null, Immutable, globalArgs, immutableCollection),
		toImmutable: toImmutable,
		update:      update.bind(null, Immutable, globalArgs, immutableCollection)
	};
}

module.exports = wrapImmutableCollection;