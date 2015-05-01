/* @flow */

function idsFromRecords(array: Array<any>, key: string): Array<string> {
	if (!key) throw new Error('Must provide a key');
	return array.map(function(record) {
		return record[key];
	});
}

module.exports = idsFromRecords;
