'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var request = require('request');

var tokenService = require(path.join(__dirname, '..', '..', '..','services/token'));
var db = require(path.join(__dirname, '..', '..', '..','config/sequelize'));

exports.loginWithEmailAndPassword = function(req, res) {
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
    return res.status(401).send({
      message: 'Wrong email and/or password'
    });
  })
};

exports.signupWithEmailAndPassword = function(req, res) {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(existingUser) {
    if (existingUser) {
      return res.status(409).send({
        message: 'Email is already taken'
      });
    }

    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function (user) {
      var token = tokenService.issueToken(user);
      res.send({
        token: token
      });
    }).catch(function (err) {
      return res.status(400).send({
        message: err
      });
    });
  }).catch(function(err) {
    return res.status(401).send({
      message: err
    });
  })
};
