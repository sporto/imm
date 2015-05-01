var isArray                   = require('../utils/isArray.js');
var isImmutableInstance       = require('../utils/isImmutableInstance.js');

function assertIsPlainArray(Immutable, array) {
	var one = !isArray(array);
	var two = isImmutableInstance(Immutable, array);
	if (one || two) throw new Error('You must provide an array');
}

module.exports = assertIsPlainArray;
