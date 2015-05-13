/* @flow */

/*!
 * Module dependencies.
 */
var idsFromRecords          = require('../utils/idsFromRecords.js');
var wrapAsArray             = require('../utils/wrapAsArray.js');
var mergeDefaults           = require('../utils/defaults.js');
var anyExist                = require('./anyExist.js');
var wrapImmutableCollection = require('./wrapImmutableCollection.js');
var toArrayIfImmList        = require('../utils/toArrayIfImmList');

/**
* Updates one record or many.
* This merges the given data with the existing one.
* If a record is not found then it gets added.
* This throws if a record doesn't have an key
*
* ### Examples:
*
* 	list = list.update(record)
* 	list = list.update(array)
*
* @param {Object|Array} recordOrRecords Record or records to update
* @param {Object} args Optional arguments
* @param {Boolean} args.strict=false Throws if record exist
* @return {Imm.List} Modified Imm list
* @api public
*/
function update(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	recordOrRecords: Object | Array<Object>,
	args: Object
	) {

	var defaults = {
		strict: false
	};
	args = mergeDefaults(args, defaults);

	var givenId;
	var givenRecord;
	var toMerge;
	var existing;
	var mergedRecord;
	var newCol = immutableCollection;

	var givenRecords = toArrayIfImmList(recordOrRecords);
	givenRecords     = wrapAsArray(givenRecords);

	if (args.strict) {
		// throw if any record exists
		var records = wrapAsArray(recordOrRecords);
		var ids     = idsFromRecords(records, globalArgs.key);
		var exists  = anyExist(Immutable, globalArgs, immutableCollection, ids);
		if (exists) throw new Error('Some records already exist');
	}

	for (var a = 0; a < givenRecords.length; a++) {
		givenRecord = givenRecords[a];
		givenId = givenRecord[globalArgs.key];
		// throw if no givenId
		if (!givenId) throw new Error('Record must have .' + globalArgs.key);

		existing = immutableCollection[givenId];
		if (existing) {
			mergedRecord = existing.merge(givenRecord);
		} else {
			mergedRecord = givenRecord;
		}

		toMerge = {};
		toMerge[givenId] = mergedRecord;

		newCol = newCol.merge(toMerge);
	}

	return wrapImmutableCollection(Immutable, globalArgs, newCol);
}

module.exports = update;
