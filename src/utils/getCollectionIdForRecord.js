var generateUID              = require('./generateUID.js');

function getCollectionIdForRecord(record, globalArgs) {
	var id = record[globalArgs.key];
	return id || generateUID();
}

module.exports = getCollectionIdForRecord;
