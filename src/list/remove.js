/* @flow */

/*!
 * Module dependencies.
 */
var idsAsStrings            = require('../utils/idsAsStrings.js');
var allExist                = require('./allExist.js');
var wrapAsArray             = require('../utils/wrapAsArray.js');
var wrapImmutableCollection = require('./wrapImmutableCollection.js');

/**
* Removes one or many records based on the id.
* If record is not found then it just gets skipped.
*
* ### Examples:
*
* 	collection = collection.remove(id);
* 	collection = collection.remove(arrayOfIds);
*
* @param {Number|String|Array} idOrIds Id or ids to remove
* @param {Object} args Optional arguments
* @param {Boolean} args.strict=false Throw if record(s) doesn't exists
* @return {Imm} Modified collection
* @api public
*/
function remove(Immutable: any, globalArgs: Object, immutableCollection: any, idOrIds: string | Array<string>, args: Object) {
	var ids = wrapAsArray(idOrIds);

	// ids need to be strings for without
	ids = idsAsStrings(ids);

	if (args && args.strict) {
		var exists = allExist(Immutable, globalArgs, immutableCollection, ids);
		if (!exists) throw new Error('Some records do not exist');
	}

	var newCol = immutableCollection.without(ids);
	return wrapImmutableCollection(Immutable, globalArgs, newCol);
}

module.exports = remove;
