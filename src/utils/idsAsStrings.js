function idsAsStrings(array: Array<any>): Array<string> {
	return array.map(function(v) {
		return '' + v;
	});
}

module.exports = idsAsStrings;
