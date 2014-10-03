var Immutable = require('immutable');

function ColImmutable(col) {

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

    return ColImmutable(newCol);
  }

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
    return col.findIndex(function (record){
      return record.id = id;
    });
  }

  function update(record) {
    console.log('updated record', record)
    // throw if no id
    if (!record.id) throw new Error('Record must have an id');
    // var str = record.id.toString();
    // console.log(col.get(record.id))

    // console.log(mergable);
    // var newCol = col.update(record.id, function (oldVal) {
    //   // console.log(oldVal)
    //   return record;
    // });

    console.log(record.id);

    // find the original index
    var index = getRecordIndex(record);

    if (index == -1) throw new Error("Record not found");

    // get the old record
    var oldRecord = col.get(index);
    var newRecord = mergeRecords(oldRecord, record);

    var newCol = col.splice(index, 1, newRecord);

    // var mergable = {};
    // mergable[record.id] = record; //this is always a string
    // var newCol = col.mergeDeep(mergable);

    return ColImmutable(newCol);
  }

  function get(id) {
    return col.find(function (v) {
      return v.id == id;
    });
  }

  return {
    count: col.count.bind(col),
    get: get,
    find: col.find.bind(col),
    set: set,
    update: update
  }
}

function Perpetual(records) {
  // reorder the records by keys
  // var iRecords = _.indexBy(records, 'id');

  // return a immutable js collection
  var col = Immutable.Sequence(records).valueSeq();

  return ColImmutable(col);
}

module.exports = Perpetual;