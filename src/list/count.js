/* @flow */

/** @module List */

/**
* Records count.
*
* @example
*
* 	count = list.count();
*
* @function count
* @return {Number} count
* @api public
*/
function count(Immutable: any,
	globalArgs: Object,
	immutableCollection:any): number {

	return Object.keys(immutableCollection).length;
}

module.exports = count;
