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
    'studies',
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      from_year: { type: 'int', notNull: true },
      to_year: { type: 'int' },
      name: { type: 'string', notNull: true },
      course: { type: 'string', notNull: true },
      degree: { type: 'string' },
      description: { type: 'text' },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable('studies', callback);
};

exports._meta = {
  version: 1,
};
