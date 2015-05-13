/* @flow */

// Check if given object is the Immutable Library
function isImmutable(Immutable: any, object: any): boolean {
	if (!Immutable) throw new Error('Invalid argument Immutable');
	if (!object) throw new Error('Invalid argument object');

	return object.isImmutable != null;
}

module.exports = isImmutable;
