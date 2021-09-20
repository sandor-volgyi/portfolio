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
      'work',
      ['from_year', 'to_year', 'name', 'position', 'description'],
      [
        2014,
        2016,
        'Vodafone Shared Services',
        'Master Data Analyst',
        `As an analyst my main task was to migrate data into firm systems sent by the responsible managers and local markets either one by one or in a bigger batch using different tools (Master Data Manager, Browser based UI., SAP batch load), maintaining data quality.
Staying in contact with stakeholders to get a timely input, creating ad-hoc excel reports for management were also part of my daily tasks. Occasionally i created excel macros for data quality checks - developing new tools, while also maintaining old ones. These VBA scripts were mainly used in preparing and transforming bigger data batches for migrations.`,
      ]
    )
    .then(
      function (result) {
        db.insert(
          'work',
      ['from_year', 'to_year', 'name', 'position', 'description'],
      [
        2016,
        2019,
        'Morgan Stanley',
        'Market Risk Analyst',
        `As a risk analyst my main task was doing daily data quality checks for value at risk (VaR) calculations, keeping contact with Risk Managers. The tools required for this were SQL and excel VBA reports.
I also overviewed my team members responsible for other business areas so daily KPIs were met, issues were properly communicated with stakeholders if delay happened.
I created daily reports for management about KPIs and VaR numbers through excel and qlikview, got ownership over older reports to maintain and update.
I created VBA tools for different data handling tasks, updating available tools when necessary.`,
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
          'work',
      ['from_year', 'to_year', 'name', 'position', 'description'],
      [
        2011,
        2014,
        'Békés Megyei Kereskedelmi és Iparkamara',
        'PR Administrator',
        `Tender writing and related tasks.`,
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
          'work',
      ['from_year', 'name', 'position', 'description'],
      [
        2019,
        'ViacomCBS',
        'Business Intelligence Analyst',
        `My main task as an analyst is to keep multiple systems (billing, contracting) in sync, checking the discrepancies between the databases with SQL queries, SAP BO Webi reports, Tableau dashboards and pre-built reporting tools and monthly reporting processes. Communicating issues and finding root causes with the help of the responsible teams is also a part of my daily job.`,
          ]
        );
      },
      function (err) {
        return;
      }
    );
};

exports.down = function (db) {
  return db.runSql('TRUNCATE TABLE work;');
};

exports._meta = {
  version: 1,
};
