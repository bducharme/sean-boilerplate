'use strict';

var _ = require('lodash');
var qs = require('querystring');
var path = require('path');
var async = require('async');
var request = require('request');

var config = require(path.join(__dirname, '..', '..', '..', 'config/env'));
var tokenService = require(path.join(__dirname, '..', '..', '..', 'services/token'));
var db = require(path.join(__dirname, '..', '..', '..', 'config/sequelize'));

exports.loginWithGithub = function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({
    url: accessTokenUrl, qs: params
  }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = {
      'User-Agent': 'sean-boilerplate'
    };

    // Step 2. Retrieve profile information about the current user.
    request.get({
      url: userApiUrl,
      qs: accessToken,
      headers: headers,
      json: true
    }, function(err, response, profile) {

      // Step 3a. Link user accounts.
      if (req.headers.authorization) {
        db.User.findOne({
          where: {
            github: (profile.id).toString()
          }
        }).then(function(existingUser) {
          if (existingUser) {
            return res.status(409).send({
              message: 'There is already a GitHub account that belongs to you'
            });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = tokenService.decodeToken(token, config.TOKEN_SECRET);

          db.User.findById(payload.sub).then(function(user) {
            user.github = (profile.id).toString();
            user.picture = user.picture || profile.avatar_url;
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = tokenService.issueToken(user);
              res.send({
                token: token
              });
            }).catch(function(err) {
              return res.status(400).send({
                message: err
              });
            });
          }).catch(function() {
            return res.status(400).send({
              message: 'User not found'
            });
          });
        }).catch(function(err) {
          return res.status(400).send({
            message: err
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.

        console.log(profile);

        db.User.findOne({
          where: {
            github: (profile.id).toString()
          }
        }).then(function(existingUser) {
          if (existingUser) {
            return res.send({
              token: tokenService.issueToken(existingUser)
            });
          }
          db.User.create({
            github: (profile.id).toString(),
            picture: profile.avatar_url,
            displayName: profile.name
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
          return res.status(400).send({
            message: err
          });
        });
      }
    });
  });
};
