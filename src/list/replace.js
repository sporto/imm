/* @flow */

/** @module List */

/*!
 * Module dependencies.
 */
var idsAsStrings             = require('../utils/idsAsStrings.js');
var idsFromRecords           = require('../utils/idsFromRecords.js');
var getCollectionIdForRecord = require('../utils/getCollectionIdForRecord.js');
var mergeDefaults            = require('../utils/defaults.js');
var wrapAsArray              = require('../utils/wrapAsArray.js');
var anyExist                 = require('./anyExist.js');
var wrapImmutableCollection  = require('./wrapImmutableCollection.js');

/**
* Replaces one item or many.
* This discards any previous data from the replaced items.
* If records doesn't exist then it just gets added.
* This throws if a record doesn't have an key.
*
* @example
*
* 	list = list.replace(record)
* 	list = list.replace(array)
*
* @function replace
* @param {Object} recordOrRecords Record or records to replace
* @param {Object} args Optional arguments
* @param {Boolean} args.strict=false Throws if record exist
* @param {Boolean} args.requireKey=true Throws if record doesn't have a key
* @return {Imm.List} Modified Imm list
* @api public
*/
function replace(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	recordOrRecords: any,
	args: Object) {

	var records = wrapAsArray(recordOrRecords);
	var ids = idsFromRecords(records, globalArgs.key);
	ids = idsAsStrings(ids);
	var newCol = immutableCollection.without(ids);
	var merges = {};
	var defaults = {
		strict: false,
		requireKey: true
	};
	args = mergeDefaults(args, defaults);

	if (args.strict) {
		// throw if any record exists
		var exists = anyExist(Immutable, globalArgs, immutableCollection, ids);
		if (exists) throw new Error('Some records already exist');
	}

	for (var a = 0; a < records.length; a++) {
		var record = records[a];
		var id = record[globalArgs.key];
		if (args.requireKey && !id) throw new Error('Record must have .' + globalArgs.key);

		var collectionId = getCollectionIdForRecord(record, globalArgs);

		if (!id) {
			record.immId = collectionId;
		}

		merges[collectionId] = record;
	}

	newCol = newCol.merge(merges);

	return wrapImmutableCollection(Immutable, globalArgs, newCol);
}

module.exports = replace;
