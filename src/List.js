/* @flow */

/*!
 * Module dependencies.
 */
var wrapPlainArray      = require('./list/wrapPlainArray.js');

function makeList(Immutable: any): Function {

	/**
	* Returns an Imm list.
	* Keys are always sorted in alphabetical order.
	* This means that original order of array given is not respected.
	*
	* ### Examples:
	*
	* 	var records = [{id: 1, label: 'Sam'}, {...}];
	* 	var list = Imm.List(records);
	*
	* Imm assumes that the id key is called `id`. You can provide an optional argument:
	*
	* 	var list = Imm.List(records, {key: '_id'});
	*
	* @function Imm.List
	* @param {Array} records Array of records
	* @param {Object} args Optional arguments
	* @param {String} args.key=id Optional name of id key e.g. _id
	* @return {Imm.List} Imm List
	* @api public
	*/
	function List(records: Array<any>, args): any {
		return wrapPlainArray(Immutable, args, records);
	}

	return List;
}

module.exports = makeList;

