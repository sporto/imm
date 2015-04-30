var isArray = require('./isArray');

module.exports = function(recordOrRecords) {
	return isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
};
