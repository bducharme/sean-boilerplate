'use strict';

var _ = require('lodash');
var path = require('path');

var config = require(path.join(__dirname, '..', '..', '..', 'config/env'));
var db = require(path.join(__dirname, '..', '..', '..', 'config/sequelize'));

exports.unlinkProvider = function(req, res) {
  var provider = req.body.provider;
  var providers = ['facebook', 'google', 'github', 'twitter'];

  if (providers.indexOf(provider) === -1) {
    return res.status(400).send({
      message: 'Unknown OAuth Provider'
    });
  }

  db.User.findById(req.user).then(function(user) {
    if (!user) {
      return res.status(400).send({
        message: 'User Not Found'
      });
    }

    user[provider] = null;
    user.save().then(function() {
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
