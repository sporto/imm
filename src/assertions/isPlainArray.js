var isArray            = require('../utils/isArray.js');
var isImmutable        = require('../utils/isImmutable.js');

function assertIsPlainArray(Immutable, array) {
	var one = !isArray(array);
	var two = isImmutable(Immutable, array);
	if (one || two) throw new Error('You must provide an array');
}

module.exports = assertIsPlainArray;
