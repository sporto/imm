/* @flow */

module.exports = function(object: any): boolean {
	if (!object) throw new Error('Invalid argument object');

	return object.isImmList != null;
};
