/* @flow */

/**
* Get the first record.
* Order of records in Imm.List is not necessary the order of the records given initially.
* Returns a Seamless Immutable object.
* See https://github.com/rtfeldman/seamless-immutable#immutable-object
*
* ### Examples:
*
* 	var record = collection.first()
*
* To make object mutable use `asMutable()`
*
* 	var record = collection.first()
* 	record = record.asMutable()
* 	// or
* 	record = record.asMutable({deep: true})
*
* @return {Immutale Object} record
* @api public
*/
function first(Immutable: any,
	globalArgs: Object,
	immutableCollection: any) {

	var keys = Object.keys(immutableCollection);
	var firstKey = keys[0];
	var record = immutableCollection[firstKey];
	return record;
}

module.exports = first;
