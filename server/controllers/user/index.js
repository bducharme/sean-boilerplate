'use strict';

exports.localAuthenticationController = require("./authentication/localAuthenticationController.js");
exports.googleAuthenticationController = require("./authentication/googleAuthenticationController.js");
exports.facebookAuthenticationController = require("./authentication/facebookAuthenticationController.js");
exports.twitterAuthenticationController = require("./authentication/twitterAuthenticationController.js");
exports.githubAuthenticationController = require("./authentication/githubAuthenticationController.js");
exports.unlinkProviderController = require("./authentication/unlinkProviderController.js");

exports.userController = require("./userController.js");
