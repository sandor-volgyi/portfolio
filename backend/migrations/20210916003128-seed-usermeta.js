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
    .insert(
      'usermeta',
      ['user_id', 'meta_key', 'meta_value'],
      ['1', 'role', 'admin']
    )
    .then(
      function (result) {
        db.insert(
          'usermeta',
          ['user_id', 'meta_key', 'meta_value'],
          ['2', 'role', 'moderator']
        );
      },
      function (err) {
        return;
      }
    )
    .then(
      function (result) {
        db.insert(
          'usermeta',
          ['user_id', 'meta_key', 'meta_value'],
          ['3', 'role', 'member']
        );
      },
      function (err) {
        return;
      }
    );
};

exports.down = function (db) {
  return db.runSql('TRUNCATE TABLE usermeta;');
};

exports._meta = {
  version: 1,
};
