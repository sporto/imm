/* @flow */

var asPlainArray      = require('./asPlainArray.js');


/**
* Map the collection through a given function
*
* **Example**
*
* ```js
* collection = collection.map(function (record) {
*   return {foo: record.id};
* });
* ```
*
* @param {Function} mapper Mapping function
* @return {Array} array
* @api public
*/
function map(Immutable: any,
	globalArgs: Object,
	immutableCollection: any, 
	mapper: Function) {
	var newCol = asPlainArray();
	return newCol.map(mapper);
}

module.exports = map;
