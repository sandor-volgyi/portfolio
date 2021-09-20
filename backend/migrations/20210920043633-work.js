'use strict';

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    'work',
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      from_year: { type: 'int', notNull: true },
      to_year: { type: 'int' },
      name: { type: 'string', notNull: true },
      position: { type: 'string', notNull: true },
      description: { type: 'text' },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable('work', callback);
};

exports._meta = {
  version: 1,
};
