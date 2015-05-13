/* @flow */

/*!
 * Module dependencies.
 */
var isObject = require('./utils/isObject');
var isArray = require('./utils/isArray.js');

function makeArray(Immutable: any): any {

	/**
	* Returns an __Seamless Immutable__ Array.
	* See https://github.com/rtfeldman/seamless-immutable#immutable-array
	*
	* ### Examples:
	*
	* 	var records = [{id: 1, label: 'Sam'}, {...}];
	* 	var list = Imm.Array(records);
	*
	* @function Imm.Array
	* @param {Array} records Array of records
	* @return {SeamlessImmutable.Array} Seamless Immutable Array
	* @api public
	*/
	function Array(data) {
		if (!isArray(data)) throw new Error('You must provide an array');

		return Immutable(data)
	}

	return Array;
}

module.exports = makeArray;
