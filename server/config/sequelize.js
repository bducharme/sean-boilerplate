'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');
var config    = require('./env');
var db        = {};

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
  // import model files and save model names
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


var sequelize_fixtures = require('sequelize-fixtures');
var models = {
  User: require(path.join(__dirname, '/../models/user'))
};

// WARNING: {force: true} will DROP your database everytime you re-run your application
sequelize
  .sync({
    force: false,
    logging: false,
    hooks: false
  })
  .then(function () {
    console.log("Database synchronized");
    if(process.env.SEED) {
      require(path.join(__dirname, '/../../e2e/seed'))(db);
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
