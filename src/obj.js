/* @flow */

var isObject = require('./utils/isObject');
var isArray = require('./utils/isArray.js');

function makeObj(Immutable: any): any {

	/**
	* Returns an Seamless Immutable object
	*
	* **Example**
	*
	* ```js
	* var data = {id: 1, label: 'Sam'};
	* var record = imm.obj(data);
	* ```
	*
	* @param {Object} data A JS object
	* @return {Immutable} Immutable object
	* @api public
	*/
	function obj(data) {
		if (!isObject(data) || isArray(data)) throw new Error('You must provide an object');

		return Immutable(data)
	}

	return obj;
}

module.exports = makeObj;