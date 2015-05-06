/* @flow */

/** @module List */

/*!
 * Module dependencies.
 */
var asPlainArray      = require('./asPlainArray.js');
var wrapPlainArray    = require('./wrapPlainArray.js');
var negate            = require('../utils/negate.js');

/**
* Rejects records based on a function.
* Returns a new Imm modified list without those records.
*
* @example
*
* 	list = list.reject(function(record) {
* 		return record.age < 18;
* 	});
*
* @function reject
* @param {Function} filterer Filtering function
* @return {Imm.List} Modified Imm list
* @api public
*/
function reject(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	filterer: Function): any {

	var newCol = asPlainArray(Immutable, globalArgs, immutableCollection);
	newCol = newCol.filter(negate(filterer));
	return wrapPlainArray(Immutable, globalArgs, newCol);
}

module.exports = reject;
