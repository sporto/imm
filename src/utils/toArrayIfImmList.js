var isImmList = require('./isImmList');

function toArrayIfImmList(records): Array<any> {
	if (isImmList(records)) {
		return records.asMutable();
	} else {
		return records;
	}
};

module.exports = toArrayIfImmList;
