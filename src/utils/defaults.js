// Fill in a given object with default properties.
// http://underscorejs.org/#defaults
function defaults(obj) {
	obj = obj || {};
	for (var i = 1, length = arguments.length; i < length; i++) {
		var source = arguments[i];
		for (var prop in source) {
			if (obj[prop] === void 0) obj[prop] = source[prop];
		}
	}
	return obj;
}

module.exports = defaults;
