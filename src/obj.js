/* @flow */

/*!
 * Module dependencies.
 */
var isObject = require('./utils/isObject');
var isArray = require('./utils/isArray.js');

function makeObj(Immutable: any): any {

	/**
	* Returns an Seamless Immutable object
	* See https://github.com/rtfeldman/seamless-immutable#immutable-object
	*
	* ### Examples:
	*
	* 	var data = {id: 1, label: 'Sam'};
	* 	var record = Imm.Obj(data);
	*
	* To get back a mutable JS object use `asMutable`:
	*
	* 	var data = {id: 1, label: 'Sam'};
	* 	var immutableRecord = Imm.Obj(data);
	* 	var mutableRecord = immutableRecord.asMutable();
	*
	* @param {Object} data A JS object
	* @return {SeamlessImmutable.Object} Seamless Immutable object
	* @api public
	*/
	function Obj(data) {
		if (!isObject(data) || isArray(data)) throw new Error('You must provide an object');

		return Immutable(data)
	}

	return Obj;
}

module.exports = makeObj;
