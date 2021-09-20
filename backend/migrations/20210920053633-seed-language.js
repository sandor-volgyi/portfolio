'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db
    .insert('language', ['language', 'level'], ['hungarian', 'native'])
    .then(
      function (result) {
        db.insert('language', ['language', 'level'], ['english', 'upper-intermediate']);
      },
      function (err) {
        return;
      }
    )
};

exports.down = function (db) {
  return db.runSql('TRUNCATE TABLE language;');
};

exports._meta = {
  version: 1,
};
