var isArray = Array.isArray || function(obj) {
	return toString.call(obj) === '[object Array]';
};

function wrap(Immutable, col, key) {

	var key = key || 'id';

	function mergeRecords(oldRecord, newRecord) {
		var oldMap = Immutable.Map(oldRecord);
		var newMap = Immutable.Map(newRecord);
		return oldMap.mergeDeep(newRecord).toJS();
	}

	function getRecordIndex(givenRecord) {
		// if (!givenRecord.id) throw new Error('Record must have an id');
		return getRecordIndexById(givenRecord[key]);
	}

	function getRecordIndexById(id) {
		return col.findIndex(function(record) {
			return record[key] == id;
		});
	}

	function get(id) {
		return col.find(function(v) {
			return v[key] == id;
		});
	}

	function set(record) {
		// find if the record is there
		// replace the record or add a new one

		// return a new Col
		// var newCol = col.set(record.id, record);
		var index = getRecordIndex(record);
		var newCol;

		if (index > -1) {
			// replace record
			newCol = col.splice(index, 1, record);
		} else {
			// add record
			newCol = col.concat([record]);
		}

		return wrap(Immutable, newCol);
	}

	function add(record) {
		var index = getRecordIndex(record);
		if (index == -1) {
			return set(record);
		} else {
			throw new Error('Record already exists');
		}
	}

	function replace(record) {
		var index = getRecordIndex(record);
		if (index == -1) {
			throw new Error('Record does not exists');
		} else {
			return set(record);
		}
	}

	function update(record) {
		// throw if no id
		if (!record[key]) throw new Error('Record must have an id');

		// find the original index
		var index = getRecordIndex(record);

		if (index == -1) throw new Error("Record not found");

		// get the old record
		var oldRecord = col.get(index);
		var newRecord = mergeRecords(oldRecord, record);

		var newCol = col.splice(index, 1, newRecord);
		return wrap(Immutable, newCol);
	}

	function remove(record) {
		var index = getRecordIndex(record);
		if (index == -1) throw new Error("Record not found");

		var newCol = col.splice(index, 1);
		return wrap(Immutable, newCol);
	}

	return {
		count: col.count.bind(col),
		get: get,
		set: set,
		add: add,
		replace: replace,
		update: update,
		remove: remove,
		find: col.find.bind(col),
	}
}

function imm(Immutable, records, key) {
	if (!isArray(records)) throw new Error("You must provide an array");
	// return a immutable js collection
	var col = Immutable.Sequence(records).valueSeq();
	return wrap(Immutable, col, key);
}

// CommonJS + AMD + Global boilerplate
// https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['Immutable'], function (Immutable) {
            return (root.imm = factory(Immutable));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('Immutable'));
    } else {
        // Browser globals
        root.imm = factory(root.Immutable);
    }
}(this, function (Immutable) {

	return imm.bind(null, Immutable);

}));