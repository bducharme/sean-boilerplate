'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var request = require('request');

var config = require(path.join(__dirname, '..', '..', 'config/env'));
var tokenService = require(path.join(__dirname, '..', '..', 'services/token'));
var db = require(path.join(__dirname, '..', '..', 'config/sequelize'));

exports.loginWithEmailAndPassword = function(req, res) {
  console.log(req.body);

  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(user) {
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({
          message: 'Wrong email and/or password'
        });
      }
      res.send({
        token: tokenService.issueToken(user)
      });
    });
  }).catch(function() {
    console.log('here?');
    return res.status(401).send({
      message: 'Wrong email and/or password'
    });
  })
};
