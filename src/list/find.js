/* @flow */

/*!
 * Module dependencies.
 */
var asPlainArray      = require('./asPlainArray.js');

/**
* Finds one record.
* Returns a plain JS mutable object.
*
* ### Example:
*
* 	var record = collection.find(function (record) {
* 		return record.age === 18;
* 	});
*
* @param {Function} finder Finder function
* @return {SeamlessImmutable.Object} record Record or undefined
* @api public
*/
function find(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	finder: Function) {

	var records = asPlainArray(Immutable, globalArgs, immutableCollection);

	for (var a = 0; a < records.length; a++) {
		var record = records[a];
		if (finder(record)) {
			return Immutable(record);
		}
	}
	return void(0);
}

module.exports = find;
