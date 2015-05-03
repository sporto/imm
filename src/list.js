/* @flow */

/*!
 * Module dependencies.
 */
var wrapPlainArray      = require('./list/wrapPlainArray.js');

function makeList(Immutable: any): Function {

	/**
	* Returns an Imm list
	* Keys are always sorted in alphabetical order
	*
	* ### Examples:
	*
	* 	var records = [{id: 1, label: 'Sam'}, {...}];
	* 	collection = Imm.list(records);
	*
	* Imm assumes that the id key is called `id`. You can provide an optional argument:
	*
	* 	collection = Imm.list(records, {key: '_id'});
	*
	* @param {Array} records Array of records
	* @param {Object} args Optional arguments
	* @param {String} args.key=id Optional name of id key e.g. _id
	* @return {Imm.list} Imm List
	* @api public
	*/
	function list(records: Array<any>, args): any {
		return wrapPlainArray(Immutable, args, records);
	}

	return list;
}

module.exports = makeList;
