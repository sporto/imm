/* @flow */

/*!
 * Module dependencies.
 */
var asPlainArray      = require('./asPlainArray.js');
var wrapPlainArray    = require('./wrapPlainArray.js');

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
function filter(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	filterer: Function): any {

	var newCol = asPlainArray(Immutable, globalArgs, immutableCollection);
	newCol = newCol.filter(filterer);
	return wrapPlainArray(Immutable, globalArgs, newCol);
}

module.exports = filter;
