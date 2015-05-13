/* @flow */

function isImmutableInstance(Immutable: any, object: any): boolean {
	if (!Immutable) throw new Error('Invalid argument Immutable');
	if (!object) throw new Error('Invalid argument object');

	return Immutable.isImmutable(object);
}

module.exports = isImmutableInstance;
