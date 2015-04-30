module.exports = function(array, value) {
	for (var a = 0; a < array.length; a++) {
		if (array[a] === value) return true;
	}
	return false;
};
