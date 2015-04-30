var isImmutable = require('../utils/isImmutable');

function assertIsImmutable(Immutable, object) {
	var is = isImmutable(Immutable, object);
	if (!is) throw new Error("Not an immutable object");
}

module.exports = assertIsImmutable;