'use strict';

var moment = require('moment');
var jwt    = require('jsonwebtoken');
var path         = require('path');
var config = require(path.join(__dirname, '..', 'config/env'));

module.exports.issueToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  };
  return jwt.sign(payload, config.TOKEN_SECRET);
};
