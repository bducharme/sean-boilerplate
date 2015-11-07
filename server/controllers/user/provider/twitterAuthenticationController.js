'use strict';

var _ = require('lodash');
var qs = require('querystring');
var path = require('path');
var async = require('async');
var request = require('request');

var config = require(path.join(__dirname, '..', '..', '..', 'config/env'));
var tokenService = require(path.join(__dirname, '..', '..', '..', 'services/token'));
var db = require(path.join(__dirname, '..', '..', '..', 'config/sequelize'));


exports.loginWithTwitter = function(req, res) {
  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      callback: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.post({
      url: requestTokenUrl,
      oauth: requestTokenOauth
    }, function(err, response, body) {
      var oauthToken = qs.parse(body);
      res.send(oauthToken);
    });
  } else {
    var accessTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };

    request.post(accessTokenUrl, {
      url: accessTokenUrl,
      oauth: accessTokenOauth
    }, function(err, response, token) {
      var accessToken = qs.parse(token);

      var profileOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        oauth_token: accessToken.oauth_token
      };

      // Step 2. Retrieve profile information about the current user.
      request.get({
        url: profileUrl + accessToken.screen_name,
        oauth: profileOauth,
        json: true
      }, function(err, response, profile) {
        if (profile.error) {
          return res.status(500).send({
            message: profile.error.message
          });
        }
        // Step 3a. Link user accounts.
        if (req.headers.authorization) {
          db.User.findOne({
            where: {
              twitter: profile.id
            }
          }).then(function(existingUser) {
            if (existingUser) {
              return res.status(409).send({
                message: 'There is already a Twitter account that belongs to you'
              });
            }
            var token = req.headers.authorization.split(' ')[1];
            var payload = tokenService.decodeToken(token, config.TOKEN_SECRET);

            db.User.findById(payload.sub).then(function(user) {
              user.twitter = profile.id;
              user.displayName = user.displayName || profile.name;
              user.picture = user.picture || profile.profile_image_url.replace('_normal', '');
              user.save().then(function() {
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
          db.User.findOne({
            where: {
              twitter: profile.id
            }
          }).then(function(existingUser) {
            if (existingUser) {
              return res.send({
                token: tokenService.issueToken(existingUser)
              });
            }
            db.User.create({
              twitter: profile.id,
              displayName: profile.name,
              picture: profile.profile_image_url.replace('_normal', '')
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
  }
};
