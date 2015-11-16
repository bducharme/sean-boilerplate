'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');
var config    = require('./env');
var db        = {};

var sequelize = new Sequelize(config.db.dbName, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  port:   config.db.port,
  logging : false
});

sequelize.authenticate()
  .then(function () {
    console.log('Database connection has been established successfully.')
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:' +  err);
  })
  .done();

fs.readdirSync(config.modelsDirectory)
  .filter(function(file) {
    return (file.indexOf('.') !== 0);
  })
  .forEach(function(file) {
    console.log('Loading model file ' + file);
    var model = sequelize.import(path.join(config.modelsDirectory, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
});

// WARNING: {force: true} will DROP your database
sequelize
  .sync({
    force: false,
    logging: false,
    hooks: false
  })
  .then(function () {
    console.log("Database synchronized");
    if(process.env.SEED === 'seed') {
      require(path.join(__dirname, '/../../e2e/seed'))(db);
      console.log("Database seeded");
    }
  })
  .catch(function (err) {
    console.log("An error occured %j", err);
  })
  .done();

module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
