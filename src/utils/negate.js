function negate(fn) {
	return function() {
		return !fn.apply(this, arguments);
	};
}

module.exports = negate;
