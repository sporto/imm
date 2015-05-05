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
function count(Immutable: any,
	globalArgs: Object,
	immutableCollection:any): number {

	return Object.keys(immutableCollection).length;
}

module.exports = count;
