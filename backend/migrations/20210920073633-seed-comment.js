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
  const now = Math.floor(Date.now() / 1000);
  return db
    .insert(
      'comment',
      ['user_id', 'created_on', 'comment'],
      ['1', now-1000, "This is my very first comment. Dear Members, don't hesitate to share your reviews about me!"]
    )
    .then(
      function (result) {
        db.insert(
          'comment',
      ['user_id', 'created_on', 'comment'],
      ['2', now - 500, "Hi All! Please keep the discussion moderated. I will be here to moderate of course, but i would prefer working less."]
        );
      },
      function (err) {
        return;
      }
    )
    .then(
      function (result) {
        db.insert(
          'comment',
      ['user_id', 'created_on', 'comment'],
      ['3', now - 100, "Hi! I'm the very first commenter it seems. Wish you good luck with your site, have fun!"]
        );
      },
      function (err) {
        return;
      }
    );
};

exports.down = function (db) {
  return db.runSql('TRUNCATE TABLE comment;');
};

exports._meta = {
  version: 1,
};
