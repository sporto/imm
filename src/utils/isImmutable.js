/* @flow */

function isImmutable(Immutable: any, object: any): boolean {
	return object.isImmutable != null;
}

module.exports = isImmutable;
