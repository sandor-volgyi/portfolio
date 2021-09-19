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
    'usermeta',
    {
      umeta_id: { type: 'int', primaryKey: true, autoIncrement: true },
      user_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'FK_usermeta_user',
          table: 'user',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE',
          },
        },
      },
      meta_key: { type: 'string', notNull: true },
      meta_value: { type: 'string' },
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
