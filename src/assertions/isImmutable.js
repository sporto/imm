var isImmutable = require('../utils/isImmutable.js');

function assertIsImmutable(Immutable, object) {
	var is = isImmutable(Immutable, object);
	if (!is) throw new Error('Not Immutable');
}

module.exports = assertIsImmutable;
