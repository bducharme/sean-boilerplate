'use strict';

var path = require('path');

var user = require(path.join(__dirname, '..', 'controllers/user'));
var authenticationService = require(path.join(__dirname, '..', 'services/authentication'));

module.exports = function(app) {

  app.route('/auth/signup').post(user.localAuthenticationController.signupWithEmailAndPassword);
  app.route('/auth/login').post(user.localAuthenticationController.loginWithEmailAndPassword);

  app.route('/auth/google').post(user.googleAuthenticationController.loginWithGoogle);
  app.route('/auth/facebook').post(user.facebookAuthenticationController.loginWithFacebook);
  app.route('/auth/twitter').post(user.twitterAuthenticationController.loginWithTwitter);
  app.route('/auth/github').post(user.githubAuthenticationController.loginWithGithub);

  app.route('/auth/unlink').post(authenticationService.ensureAuthenticated, user.unlinkProviderController.unlinkProvider);

  app.route('/api/me').get(authenticationService.ensureAuthenticated, user.userController.currentUser);

  app.route('/api/account/profile')
    .put(authenticationService.ensureAuthenticated, user.userController.updateUser)
    .delete(authenticationService.ensureAuthenticated, user.userController.deleteAccount);

  app.route('/api/account/password')
    .put(authenticationService.ensureAuthenticated, user.userController.updatePassword);


};
