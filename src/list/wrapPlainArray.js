/* @flow */

var generateUID             = require('../utils/generateUID.js');
var mergeDefaults           = require('../utils/defaults.js');
var wrapImmutableCollection = require('./wrapImmutableCollection.js');
var assertIsObject          = require('../assertions/isObject.js');
var assertIsPlainArray      = require('../assertions/isPlainArray.js');

var DEFAULT_KEY = 'id';

/**
* @param {Array}
* @return {Immutable List}
*/
function wrapPlainArray(Immutable: any, args: Object, array: Array<Object>): any {
	var id;
	var mergable;
	if (!array) array = [];

	if (args) assertIsObject(args, 'You must provide an object for arguments');

	var defaults = {
		key: DEFAULT_KEY
	};
	args = mergeDefaults(args, defaults);

	assertIsPlainArray(Immutable, array);

	// return a immutable object
	var col = Immutable(array).asObject(function(record) {
		id = record[args.key];
		if (!id) {
			id = generateUID();
			mergable = {};
			mergable[args.key] = id;
			record = record.merge(mergable);
		}
		return [id, record];
	});

	return wrapImmutableCollection(Immutable, args, col);
}

module.exports = wrapPlainArray;