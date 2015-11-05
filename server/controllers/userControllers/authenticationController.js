'use strict';

var _ = require('lodash');
var path = require('path');
var async = require('async');
var request = require('request');

var config = require(path.join(__dirname, '..', '..', 'config/env'));
var tokenService = require(path.join(__dirname, '..', '..', 'services/token'));
var db = require(path.join(__dirname, '..', '..', 'config/sequelize'));

/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
exports.loginWithGoogle = function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, {
    json: true, form: params
  }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = {
      Authorization: 'Bearer ' + accessToken
    };
    // Step 2. Retrieve profile information about the current user.
    request.get({
      url: peopleApiUrl,
      headers: headers,
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
            google: profile.sub
          }
        }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({
              message: 'There is already a Google account that belongs to you'
            });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = tokenService.decodeToken(token, config.TOKEN_SECRET);

          db.User.findById(payload.sub).then(function(user) {
            user.google = profile.sub;
            user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = tokenService.issueToken(user);
              res.send({
                token: token
              });
            });
          }).catch(function() {
            return res.status(400).send({
              message: 'User not found'
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        db.User.findOne({
          where: {
            google: profile.sub
          }
        }).then(function(existingUser) {
          if (existingUser) {
            return res.send({
              token: tokenService.issueToken(existingUser)
            });
          }
          db.User.create({
            google: profile.sub,
            picture: profile.picture.replace('sz=50', 'sz=200'),
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

/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
exports.loginWithFacebook = function(req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({
    url: accessTokenUrl, qs: params, json: true
  }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({
        message: accessToken.error.message
      });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({
      url: graphApiUrl,
      qs: accessToken,
      json: true
    }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({
          message: profile.error.message
        });
      }

      // Step 3a. Link user accounts.
      if (req.headers.authorization) {
        db.User.findOne({
          where: {
            facebook: profile.id
          }
        }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({
              message: 'There is already a Facebook account that belongs to you'
            });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = tokenService.decodeToken(token, config.TOKEN_SECRET);

          db.User.findById(payload.sub).then(function(user) {
            user.facebook = profile.id;
            user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = tokenService.issueToken(user);
              res.send({
                token: token
              });
            });
          }).catch(function() {
            return res.status(400).send({
              message: 'User not found'
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        db.User.findOne({
          where: {
            facebook: profile.id
          }
        }).then(function(existingUser) {
          if (existingUser) {
            return res.send({
              token: tokenService.issueToken(existingUser)
            });
          }
          db.User.create({
            facebook: profile.id,
            picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
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
