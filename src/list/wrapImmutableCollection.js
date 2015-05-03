/* @flow */

/*!
 * Module dependencies.
 */
var assertIsImmutable           = require('../assertions/isImmutable.js');
var assertIsImmutableInstance   = require('../assertions/isImmutableInstance.js');

/*
* @param {Immutable}
* @return {Imm}
* @api privates
*/
function wrapImmutableCollection(Immutable: any,
	globalArgs: Object,
	immutableCollection: any): Object {

	assertIsImmutable(Immutable, Immutable);
	assertIsImmutableInstance(Immutable, immutableCollection);

	/**
	* Convert Imm.List to plain JS array.
	* Records in the array are plain mutable JS objects.
	*
	* ### Example:
	*
	* 	var list = collection.asMutable();
	*
	* @return {Array}
	* @api public
	*/
	function asMutable(): Array<any> {
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
	* 	var list = collection.unwrap();
	*
	* @return {SeamlessImmutable.Array}
	* @api public
	*/
	function unwrap() {
		return immutableCollection;
	}

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

	return {
		isImmList:   true,
		add:         add.bind(null, Immutable, globalArgs, immutableCollection),
		allExist:    allExist.bind(null, Immutable, globalArgs, immutableCollection),
		anyExist:    anyExist.bind(null, Immutable, globalArgs, immutableCollection),
		asMutable:   asMutable,
		array:       array,
		count:       count.bind(null, Immutable, globalArgs, immutableCollection),
		filter:      filter.bind(null, Immutable, globalArgs, immutableCollection),
		find:        find.bind(null, Immutable, globalArgs, immutableCollection),
		get:         get.bind(null, Immutable, globalArgs, immutableCollection),
		replace:     replace.bind(null, Immutable, globalArgs, immutableCollection),
		map:         map.bind(null, Immutable, globalArgs, immutableCollection),
		remove:      remove.bind(null, Immutable, globalArgs, immutableCollection),
		unwrap:      unwrap,
		update:      update.bind(null, Immutable, globalArgs, immutableCollection)
	};
}

module.exports = wrapImmutableCollection;
