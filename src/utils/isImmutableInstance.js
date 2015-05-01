/* @flow */

function isImmutableInstance(Immutable: any, object: any): boolean {
	return Immutable.isImmutable(object);
}

module.exports = isImmutableInstance;
