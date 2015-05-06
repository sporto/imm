/* @flow */

/** @module List */

/**
* Get the first record.
* Order of records in Imm.List is not necessary the order of the records given initially.
* Returns a Seamless Immutable object.
* See https://github.com/rtfeldman/seamless-immutable#immutable-object
*
* @example
*
* 	var record = list.first()
*
* To make object mutable use `asMutable()`
*
* 	var record = list.first()
* 	record = record.asMutable()
* 	// or
* 	record = record.asMutable({deep: true})
*
* @function first
* @return {SeamlessImmutale.Object} record
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
