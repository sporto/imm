/* @flow */

/*!
 * Module dependencies.
 */
var idsAsStrings            = require('../utils/idsAsStrings.js');
var idsFromRecords          = require('../utils/idsFromRecords.js');
var mergeDefaults           = require('../utils/defaults.js');
var wrapAsArray             = require('../utils/wrapAsArray.js');
var generateUID             = require('../utils/generateUID.js');
var anyExist                = require('./anyExist.js');
var wrapImmutableCollection = require('./wrapImmutableCollection.js');

/**
* Replaces one item or many.
* This discards any previous data from the replaced items.
* If records doesn't exist then it just gets added.
* This throws if a record doesn't have an key.
*
* ### Examples:
*
* 	collection = collection.replace(record)
* 	collection = collection.replace(array)
*
* @param {Object} recordOrRecords Record or records to replace
* @param {Object} args Optional arguments
* @param {Boolean} args.strict=false Throws if record exist
* @param {Boolean} args.requireKey=true Throws if record doesn't have a key
* @return {Imm} Modified Imm collection
* @api public
*/
function replace(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	recordOrRecords: any,
	args: Object) {

	var record;
	var id;
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
		record = records[a];
		id = record[globalArgs.key];
		if (!id) {
			if (args.requireKey) throw new Error('Record must have .' + globalArgs.key);
			id = generateUID();
			record[globalArgs.key] = id;
		}
		if (!id) throw new Error('Record must have .' + globalArgs.key);
		merges[id] = record;
	}

	newCol = newCol.merge(merges);

	return wrapImmutableCollection(Immutable, globalArgs, newCol);
}

module.exports = replace;
