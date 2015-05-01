var isImmutableInstance = require('../utils/isImmutableInstance.js');

function assertIsImmutableInstance(Immutable, object) {
	var is = isImmutableInstance(Immutable, object);
	if (!is) throw new Error('Not an immutable object');
}

module.exports = assertIsImmutableInstance;
