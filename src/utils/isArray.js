/* @flow */

module.exports = Array.isArray || function(obj): boolean {
	return toString.call(obj) === '[object Array]';
};
