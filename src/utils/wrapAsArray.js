var isArray = require('./isArray.js');

function wrapAsArray(recordOrRecords): Array<any> {
	return isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
};

module.exports = wrapAsArray;
