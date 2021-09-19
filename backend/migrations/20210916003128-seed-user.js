'use strict';

var bcrypt = require('bcryptjs');

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
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync('password', salt);
  return db
    .insert('user', ['username', 'password'], ['sandor_god', hash])
    .then(
      function (result) {
        db.insert('user', ['username', 'password'], ['sandor_mod', hash]);
      },
      function (err) {
        return;
      }
    )
    .then(
      function (result) {
        db.insert('user', ['username', 'password'], ['sandor_mob', hash]);
      },
      function (err) {
        return;
      }
    );
};

exports.down = function (db) {
  return db.runSql('TRUNCATE TABLE user;');
};

exports._meta = {
  version: 1,
};
