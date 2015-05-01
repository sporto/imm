var isArray             = require('./utils/isArray.js');
var wrapAsArray         = require('./utils/wrapAsArray.js');
// var arrayContains         = require('./utils/arrayContains.js');
var mergeDefaults       = require('./utils/defaults.js');
var generateUID         = require('./utils/generateUID.js');
var idsAsStrings        = require('./utils/idsAsStrings.js');
var idsFromRecords      = require('./utils/idsFromRecords.js');
var assertIsObject      = require('./assertions/isObject.js');
var assertIsPlainArray  = require('./assertions/isPlainArray.js');
var assertIsImmutable   = require('./assertions/isImmutable.js');

function makeList(Immutable) {
	var DEFAULT_KEY = 'id';

	/**
	* Returns an Imm list
	* Keys are always sorted in alphabetical order
	* 
	* **Example**
	*
	* ```js
	* var records = [{id: 1, label: 'Sam'}, {...}];
	* collection = imm.list(records);
	* ```
	* imm assumes that the id key is called `id`. You can provide an optional argument:
	*
	* ```js
	* collection = imm.list(records, {key: '_id'});
	* ```
	* 
	* @param {Array} records Array of records
	* @param {Object} args Optional arguments
	* @param {String} args.key=id Optional name of id key e.g. _id
	* @return {Imm.list} Imm list
	* @api public
	*/
	function list(records, args) {
		return _wrapPlainArray(records, args);
	}



	// @param {Array}
	// @return {Imm}
	function _wrapPlainArray(array, args) {
		var id, mergable;
		if (!array) array = [];

		if (args) assertIsObject(args, 'You must provide an object for arguments');

		var defaults = {
			key: DEFAULT_KEY
		};
		args = mergeDefaults(args, defaults);

		assertIsPlainArray(Immutable, array);

		// return a immutable object
		var col = Immutable(array).asObject(function (record) {
			id = record[args.key];
			if (!id) {
				id = generateUID();
				mergable = {};
				mergable[args.key] = id;
				record = record.merge(mergable);
			}
			return [id, record];
		});

		return _wrapImmutableCollection(col, args);
	}



	// @param {Immutable}
	// @return {Imm}
	function _wrapImmutableCollection(immutableCollection, globalArgs) {

		assertIsImmutable(Immutable, immutableCollection);

		function _wrapPlainArrayWithArgs(array) {
			return _wrapPlainArray(array, globalArgs);
		}

		function _wrapImmutableCollectionWithArgs(immutableCollection) {
			return _wrapImmutableCollection(immutableCollection, globalArgs);
		}

		/**
		* Adds one or more records.
		* If record already exists then it gets replaced.
		* If a record doesn't have a key, then the key will be autogenerated.
		* 
		* **Example**
		*
		* ```js
		* // add one
		* collection = collection.add(record)
		*
		* // add many records
		* collection = collection.add(array)
		* ```
		*
		* @param {Object|Array} recordOrRecords Record or records to add
		* @param {Object} args Optional arguments
		* @param {Boolean} args.strict=false Throw if record already exists
		* @return {Imm} modified collection
		* @api public
		*/
		function add(recordOrRecords, args) {
			var defaults = {
				strict: false
			};
			args = mergeDefaults(args, defaults);

			if (args.strict) {
				// throw if any record exists
				var records = wrapAsArray(recordOrRecords);
				var ids     = idsFromRecords(records, globalArgs.key);
				if (anyExist(ids)) throw new Error('Some records already exist');
			}
			args.requireKey = false;
			return replace(recordOrRecords, args);
		}

		/**
		* Check if the given ID or all given IDs exist.
		* 
		* **Example**
		*
		* ```js
		* var exist = allExist(21);
		* var exist = allExist([11, 21]);
		* ```
		*
		* @param {Number|String|Array} idOrIds ID or IDs to check
		* @return {Boolean}
		* @api public
		*/
		function allExist(idOrIds) {
			var ids = wrapAsArray(idOrIds);
			for (var a = 0; a < ids.length; a++) {
				var id = ids[a];
				if (!immutableCollection[id]) return false;
			}
			return true;
		}

		/**
		* Check if the given ID or any given IDs exist
		*
		* **Example**
		*
		* ```js
		* var exist = anyExist(21);
		* var exist = anyExist([11, 21]);
		* ```
		*
		* @param {Number|String|Array} idOrIds Id or Ids to check
		* @return {Boolean}
		* @api public
		*/
		function anyExist(idOrIds) {
			var ids = wrapAsArray(idOrIds);
			for (var a = 0; a < ids.length; a++) {
				var id = ids[a];
				if (immutableCollection[id]) return true;
			}
			return false;
		}

		/**
		* Get all records.
		* Records in the array are plain mutable JS objects.
		* 
		* **Example**
		*
		* ```js
		* var records = collection.array();
		* ```
		*
		* @return {Array} records Plain array with records
		* @api public
		*/
		function array() {
			return asPlainArray();
		}

		function asPlainArray() {
			return Object.keys(immutableCollection).map(function (key) {
				return immutableCollection[key].asMutable({deep: true});
			});
		}

		/**
		* Records count.
		*
		* **Example**
		* 
		* ```js
		* count = collection.count();
		* ```
		*
		* @return {Number} count
		* @api public
		*/
		function count(){
			return Object.keys(immutableCollection).length;
		}

		/**
		* Filters the collection based on a filtering function.
		* 
		* **Example**
		*
		* ```js
		* collection = collection.filter(function (record) { 
		*   return record.age > 18;
		* });
		* ```
		*
		* @param {Function} filterer Filtering function
		* @return {Imm} Modified collection
		* @api public
		*/
		function filter(filterer) {
			var newCol = asPlainArray();
			newCol = newCol.filter(filterer);
			return _wrapPlainArrayWithArgs(newCol);
		}

		/**
		* Finds one record.
		* Returns a plain JS mutable object.
		* 
		* **Example**
		*
		* ```js
		* var record = collection.find(function (record) { 
		*   return record.age === 18;
		* });
		* ```
		*
		* @param {Function} finder Finder function
		* @return {Object} record Record or undefined
		* @api public
		*/
		function find(finder) {
			var records = asPlainArray();
			for (var a = 0; a < records.length; a++) {
				var record = records[a];
				if (finder(record)) {
					return record;
				}
			}
			return void(0);
		}

		/**
		* Get a record.
		* Returned record is a plain JS mutable object.
		*
		* **Example**
		*
		* ```js
		* var record = collection.get(11)
		* var record = collection.get('11') // same as 11
		* ```
		*
		* @param {Number|String} id Id to fetch
		* @return {Object} record
		* @api public
		*/
		function get(id) {
			var record = immutableCollection[id];
			if (!record) return void(0);
			return record.asMutable({deep: true});
		}

		/**
		* Map the collection through a given function
		* 
		* **Example**
		*
		* ```js
		* collection = collection.map(function (record) { 
		*   return {foo: record.id};
		* });
		* ```
		*
		* @param {Function} mapper Mapping function
		* @return {Array} array
		* @api public
		*/
		function map(mapper) {
			var newCol = asPlainArray();
			return newCol.map(mapper);
		}

		/**
		* Removes one or many records based on the id.
		* If record is not found then it just gets skipped.
		* 
		* **Example**
		*
		* ```js
		* collection = collection.remove(id);
		* collection = collection.remove(arrayOfIds);
		* ```
		*
		* @param {Number|String|Array} idOrIds Id or ids to remove
		* @param {Object} args Optional arguments
		* @param {Boolean} args.strict=false Throw if record(s) doesn't exists
		* @return {Imm} Modified collection
		* @api public
		*/
		function remove(idOrIds, args) {
			var ids = wrapAsArray(idOrIds);

			// ids need to be strings for without
			ids = idsAsStrings(ids);

			if (args && args.strict) {
				if (!allExist(ids)) throw new Error('Some records do not exist');
			}

			var newCol = immutableCollection.without(ids);
			return _wrapImmutableCollectionWithArgs(newCol);
		}

		/**
		* Replaces one item or many. 
		* This discards any previous data from the replaced items.
		* If records doesn't exist then it just gets added.
		* This throws if a record doesn't have an key.
		* 
		* **Example**
		*
		* ```js
		* collection = collection.replace(record)
		* collection = collection.replace(array)
		* ```
		*
		* @param {Object} recordOrRecords Record or records to replace
		* @param {Object} args Optional arguments
		* @param {Boolean} args.strict=false Throws if record exist
		* @param {Boolean} args.requireKey=true Throws if record doesn't have a key
		* @return {Imm} Modified Imm collection
		* @api public
		*/
		function replace(recordOrRecords, args) {
			var record, id;
			var records = wrapAsArray(recordOrRecords);
			var ids = idsFromRecords(records, globalArgs.key);
			ids = idsAsStrings(ids);
			var newCol = immutableCollection.without(ids);
			var merges = {};
			var defaults = {
				strict: false,
				requireKey: true
			};
			args = mergeDefaults(args, defaults);

			if (args.strict) {
				// throw if any record exists
				if (anyExist(ids)) throw new Error('Some records already exist');
			}

			for (var a = 0; a < records.length; a++) {
				record = records[a];
				id = record[globalArgs.key];
				if (!id) {
					if (args.requireKey) throw new Error("Record must have ." + globalArgs.key);
					id = generateUID();
					record[globalArgs.key] = id;
				}
				if (!id) throw new Error("Record must have ." + globalArgs.key);
				merges[id] = record;
			}

			newCol = newCol.merge(merges);

			return _wrapImmutableCollectionWithArgs(newCol);
		}

		function toImmutable() {
			return immutableCollection;
		}

		/**
		* Updates one record or many. 
		* This merges the given data with the existing one.
		* If a record is not found then it gets added.
		* This throws if a record doesn't have an key
		* 
		* **Example**
		*
		* ```js
		* collection = collection.update(record)
		* collection = collection.update(array)
		* ```
		*
		* @param {Object|Array} recordOrRecords Record or records to update
		* @param {Object} args Optional arguments
		* @param {Boolean} args.strict=false Throws if record exist
		* @return {Imm} Modified collection
		* @api public
		*/
		function update(recordOrRecords, args) {
			var defaults = {
				strict: false
			};
			args = mergeDefaults(args, defaults);

			var givenId, givenRecord, toMerge, existing, mergedRecord;
			var givenRecords = wrapAsArray(recordOrRecords);
			var newCol = immutableCollection;

			if (args.strict) {
				// throw if any record exists
				var records = wrapAsArray(recordOrRecords);
				var ids     = idsFromRecords(records, globalArgs.key);
				if (anyExist(ids)) throw new Error('Some records already exist');
			}

			for (var a = 0; a < givenRecords.length; a++) {
				givenRecord = givenRecords[a];
				givenId = givenRecord[globalArgs.key];
				// throw if no givenId
				if (!givenId) throw new Error('Record must have .' + globalArgs.key);

				existing = immutableCollection[givenId];
				if (existing) {
					mergedRecord = existing.merge(givenRecord);
				} else {
					mergedRecord = givenRecord;
				}

				toMerge = {};
				toMerge[givenId] = mergedRecord;

				newCol = newCol.merge(toMerge);
			}

			return _wrapImmutableCollectionWithArgs(newCol);
		}

		return {
			isImmList:   true,
			add:         add,
			allExist:    allExist,
			anyExist:    anyExist,
			array:       array,
			count:       count,
			filter:      filter,
			find:        find,
			get:         get,
			replace:     replace,
			map:         map,
			remove:      remove,
			toImmutable: toImmutable,
			update:      update,
		};
	}

	return list;
}

module.exports = makeList;