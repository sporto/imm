function arrayContains(array: Array<any>, value: any): boolean {
	for (var a = 0; a < array.length; a++) {
		if (array[a] === value) return true;
	}
	return false;
};

module.exports = arrayContains;
