module.exports = Array.isArray || function(obj) {
	return toString.call(obj) === '[object Array]';
};
