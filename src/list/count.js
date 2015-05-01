/* @flow */

/**
* Records count.
*
* **Example**
*
* ```js
* count = collection.count();
* ```
*
* @return {Number} count
* @api public
*/
function count(Immutable, globalArgs, immutableCollection): number {
	return Object.keys(immutableCollection).length;
}