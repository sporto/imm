var generateUID              = require('./generateUID.js');

function getCollectionIdForRecord(record, globalArgs) {
	var id = record[globalArgs.key];
	if (id) return id;
	// generate id otherwise
	return generateUID()
}

module.exports = getCollectionIdForRecord;
