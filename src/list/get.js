/* @flow */



/**
* Get a record by id.
* Returns a Seamless Immutable object
* See https://github.com/rtfeldman/seamless-immutable#immutable-object
*
* ### Examples:
*
* 	var record = collection.get(11)
* 	var record = collection.get('11') // same as 11
*
* To make object mutable use `asMutable()`
*
* 	var record = collection.get(11)
* 	record = record.asMutable()
* 	// or
* 	record = record.asMutable({deep: true})
*
* @param {Number|String} id Id to fetch
* @return {Immutale Object} record
* @api public
*/
function get(Immutable: any,
	globalArgs: Object,
	immutableCollection: any,
	id: string) {
	var record = immutableCollection[id];
	if (!record) return void(0);
	return record;
}

module.exports = get;