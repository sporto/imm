/* @flow */

/** @module List */

/*!
 * Private
 *
 */
function asPlainArray(Immutable: any,
	globalArgs: Object,
	immutableCollection:any
	): Array<any> {

	return Object.keys(immutableCollection).map(function(key) {
		return immutableCollection[key].asMutable({deep: true});
	});
}

module.exports = asPlainArray;
