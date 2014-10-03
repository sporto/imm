var Immutable = require('immutable');

function AsImmutable(col) {

	function mergeRecords(oldRecord, newRecord) {
		var oldMap = Immutable.Map(oldRecord);
		var newMap = Immutable.Map(newRecord);
		return oldMap.mergeDeep(newRecord).toJS();
	}

	function getRecordIndex(givenRecord) {
		// if (!givenRecord.id) throw new Error('Record must have an id');
		return getRecordIndexById(givenRecord.id);
	}

	function getRecordIndexById(id) {
		return col.findIndex(function(record) {
			return record.id == id;
		});
	}

	function get(id) {
		return col.find(function(v) {
			return v.id == id;
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

		return AsImmutable(newCol);
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
		if (!record.id) throw new Error('Record must have an id');

		// find the original index
		var index = getRecordIndex(record);

		if (index == -1) throw new Error("Record not found");

		// get the old record
		var oldRecord = col.get(index);
		var newRecord = mergeRecords(oldRecord, record);

		var newCol = col.splice(index, 1, newRecord);
		return AsImmutable(newCol);
	}

	function remove(record) {
		var index = getRecordIndex(record);
		if (index == -1) throw new Error("Record not found");

		var newCol = col.splice(index, 1);
		return AsImmutable(newCol);
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

function Eversame(records) {
	// reorder the records by keys
	// var iRecords = _.indexBy(records, 'id');

	// return a immutable js collection
	var col = Immutable.Sequence(records).valueSeq();

	return AsImmutable(col);
}

module.exports = Eversame;