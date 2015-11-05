'use strict';

var path = require('path');

var user = require(path.join(__dirname, '..', 'controllers/user'));

module.exports = function(app) {

  app.route('/auth/google').post(user.googleAuthenticationController.loginWithGoogle);
  app.route('/auth/facebook').post(user.facebookAuthenticationController.loginWithFacebook);
  app.route('/auth/github').post(user.githubAuthenticationController.loginWithGithub);

};
