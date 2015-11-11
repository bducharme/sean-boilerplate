'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var request = require('request');

var config = require(path.join(__dirname, '..', '..', 'config/env'));
var db = require(path.join(__dirname, '..', '..', 'config/sequelize'));

exports.currentUser = function(req, res) {
  db.User.findById(req.user).then(function(user) {
    res.send(user);
  }).catch(function(err) {
    return res.status(401).send({
      message: err
    });
  });
};

exports.updateUser = function(req, res) {
  db.User.findById(req.user).then(function(user) {
    if (!user) {
      return res.status(400).send({
        message: 'User Not Found'
      });
    }
    user.email = req.body.email || user.email;
    user.save().then(function () {
      res.status(200).end();
    }).catch(function(err) {
      return res.status(401).send({
        message: err
      });
    });
  }).catch(function(err) {
    return res.status(401).send({
      message: err
    });
  });
};
