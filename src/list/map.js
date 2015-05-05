/* @flow */

/*!
 * Module dependencies.
 */
var asPlainArray      = require('./asPlainArray.js');

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
function map(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	mapper: Function):Array<any> {

	var newCol = asPlainArray(Immutable, globalArgs, immutableCollection);
	return newCol.map(mapper);
}

module.exports = map;
