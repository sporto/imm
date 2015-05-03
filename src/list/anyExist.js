/* @flow */

/*!
 * Module dependencies.
 */
var wrapAsArray         = require('../utils/wrapAsArray.js');

/**
* Check if the given ID or any given IDs exist
*
* ### Examples:
*
* 	var exist = anyExist(21);
* 	var exist = anyExist([11, 21]);
*
* @param {Number|String|Array} idOrIds Id or Ids to check
* @return {Boolean}
* @api public
*/
function anyExist(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	idOrIds: string | Array<string>): boolean {

	var ids = wrapAsArray(idOrIds);
	for (var a = 0; a < ids.length; a++) {
		var id = ids[a];
		if (immutableCollection[id]) return true;
	}
	return false;
}

module.exports = anyExist;
