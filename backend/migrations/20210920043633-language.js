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
    'language',
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      language: { type: 'string', notNull: true },
      level: { type: 'string', notNull: true  },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable('usermeta', callback);
};

exports._meta = {
  version: 1,
};
