/* @flow */

/*!
 * Module dependencies.
 */
var wrapAsArray         = require('../utils/wrapAsArray.js');

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
function allExist(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	idOrIds: string | Array<string>): boolean {

	var ids = wrapAsArray(idOrIds);
	for (var a = 0; a < ids.length; a++) {
		var id = ids[a];
		if (!immutableCollection[id]) return false;
	}
	return true;
}

module.exports = allExist;
