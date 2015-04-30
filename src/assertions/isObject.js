var isObject = require('../utils/isObject.js');

function assertIsObject(object, msg) {
	if (!msg) msg = 'Not an object';
	if (!isObject(object)) throw new Error(msg);
}

module.exports = assertIsObject;