/* @flow */
var asPlainArray      = require('./asPlainArray.js');
var wrapPlainArray    = require('./wrapPlainArray.js');

/**
* Filters the collection based on a filtering function.
*
* **Example**
*
* ```js
* collection = collection.filter(function (record) {
*   return record.age > 18;
* });
* ```
*
* @param {Function} filterer Filtering function
* @return {Imm} Modified collection
* @api public
*/
function filter(Immutable: any,
	globalArgs: Object,
	immutableCollection: any, 
	filterer: Function): any {

	var newCol = asPlainArray(Immutable, globalArgs, immutableCollection);
	newCol = newCol.filter(filterer);
	return wrapPlainArray(Immutable, globalArgs, newCol);
}

module.exports = filter;
