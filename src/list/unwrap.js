/* @flow */

/**
* Convert Imm list to Seamless Immutable Object.
* The ids of the records are used as the keys for the returned object.
* See https://github.com/rtfeldman/seamless-immutable#immutable-object.
*
* ### Examples:
*
* 	var list = list.unwrap();
*
* @return {SeamlessImmutable.Object}
* @api public
*/
function unwrap(Immutable: any,
	globalArgs: Object,
	immutableCollection:any): number {

	return immutableCollection;
}

module.exports = unwrap;
