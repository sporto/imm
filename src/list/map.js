/* @flow */

/** @module List */

/*!
 * Module dependencies.
 */
var asPlainArray      = require('./asPlainArray.js');

/**
* Maps the list through a given function
*
* @example
*
* 	list = list.map(function (record) {
* 		return {foo: record.id};
* 	});
*
* @function map
* @param {Function} mapper Mapping function
* @return {Array} array
* @api public
*/
function map(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	mapper: Function): Array<any> {

	var keys = Object.keys(immutableCollection);
	return keys.map(function(key) {
		return mapper(immutableCollection[key])
	});
}

module.exports = map;
