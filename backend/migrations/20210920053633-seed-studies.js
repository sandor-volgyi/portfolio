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
      'studies',
      ['from_year', 'to_year', 'name', 'course', 'degree', 'description'],
      [
        2007,
        2013,
        'University Of Szeged',
        'Trade and Marketing',
        'BA degree',
        '',
      ]
    )
    .then(
      function (result) {
        db.insert(
          'studies',
          ['from_year', 'to_year', 'name', 'course', 'degree', 'description'],
          [
            2014,
            2017,
            'University of Óbuda',
            'Business Development',
            'MA degree',
            '',
          ]
        );
      },
      function (err) {
        return;
      }
    )
    .then(
      function (result) {
        db.insert(
          'studies',
          ['from_year', 'name', 'course', 'description'],
          [
            2020,
            'Green Fox Academy',
            'Junior Frontend Developer',
            'Workshop phase (10 weeks): Typescript, Project phase (6 weeks): Express.js, Github, HTML, Javascript, JIRA, MySQL, Node.js, React, TypeScript, Unit Testing',
          ]
        );
      },
      function (err) {
        return;
      }
    );
};

exports.down = function (db) {
  return db.runSql('TRUNCATE TABLE studies;');
};

exports._meta = {
  version: 1,
};
