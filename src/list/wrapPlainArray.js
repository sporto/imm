/* @flow */

/*!
 * Module dependencies.
 */
var wrapImmutableCollection = require('./wrapImmutableCollection.js');
var getCollectionIdForRecord   = require('../utils/getCollectionIdForRecord.js');
// var generateUID             = require('../utils/generateUID.js');
var mergeDefaults           = require('../utils/defaults.js');
var assertIsObject          = require('../assertions/isObject.js');
var assertIsPlainArray      = require('../assertions/isPlainArray.js');

var DEFAULT_KEY = 'id';

/*!
 * Private
 *
 * @param {Array}
 * @return {Imm.List}
 * @api private
 */
function wrapPlainArray(Immutable: any,
	globalArgs: Object,
	array: Array<Object>
	): any {

	if (!array) array = [];

	if (globalArgs) assertIsObject(globalArgs, 'You must provide an object for arguments');

	var defaults = {
		key: DEFAULT_KEY
	};
	globalArgs = mergeDefaults(globalArgs, defaults);

	assertIsPlainArray(Immutable, array);

	// return a immutable object
	var col = Immutable(array).asObject(function(record) {
		var id = record[globalArgs.key];
		var collectionId = getCollectionIdForRecord(record, globalArgs);

		if (!id) {
			var mergable = {};
			mergable.immId = collectionId;
			record = record.merge(mergable);
		}
		return [collectionId, record];
	});

	return wrapImmutableCollection(Immutable, globalArgs, col);
}

module.exports = wrapPlainArray;
