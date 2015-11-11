'use strict';

var moment = require('moment');
var path = require('path');

var config = require(path.join(__dirname, '..', 'config/env'));
var tokenService = require(path.join(__dirname, './token'));

exports.ensureAuthenticated = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header'
    });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = tokenService.decodeToken(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({
      message: err.message
    });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({
      message: 'Token has expired'
    });
  }
  req.user = payload.sub;

  next();
};
