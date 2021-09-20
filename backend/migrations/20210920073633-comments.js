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
    'comment',
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'FK_comment_user',
          table: 'user',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE',
          },
        },
      },
      created_on: { type: 'bigint', notNull: true },
      edited_on: { type: 'bigint' },
      comment: { type: 'text',notNull: true }
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable('comment', callback);
};

exports._meta = {
  version: 1,
};
