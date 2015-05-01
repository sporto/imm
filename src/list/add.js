/* @flow */
var replace        = require('./replace');
var anyExist = require('./anyExist');
var idsFromRecords = require('../utils/idsFromRecords');
var wrapAsArray = require('../utils/wrapAsArray');
var mergeDefaults = require('../utils/defaults');


/**
* Adds one or more records.
* If record already exists then it gets replaced.
* If a record doesn't have a key, then the key will be autogenerated.
*
* **Example**
*
* ```js
* // add one
* collection = collection.add(record)
*
* // add many records
* collection = collection.add(array)
* ```
*
* @param {Object|Array} recordOrRecords Record or records to add
* @param {Object} args Optional arguments
* @param {Boolean} args.strict=false Throw if record already exists
* @return {Imm} modified collection
* @api public
*/
function add(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	recordOrRecords: Object | Array<Object>,
	args: Object) {

	var defaults = {
		strict: false
	};
	args = mergeDefaults(args, defaults);

	if (args.strict) {
		// throw if any record exists
		var records = wrapAsArray(recordOrRecords);
		var ids     = idsFromRecords(records, globalArgs.key);
		if (anyExist(ids)) throw new Error('Some records already exist');
	}
	args.requireKey = false;

	return replace(globalArgs, immutableCollection, recordOrRecords, args);
}


module.exports = add;
