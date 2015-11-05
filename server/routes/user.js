'use strict';

var path = require('path');

var userControllers = require(path.join(__dirname, '..', 'controllers/userControllers'));

module.exports = function(app) {

  app.route('/auth/google').post(userControllers.authenticationController.loginWithGoogle);
  app.route('/auth/facebook').post(userControllers.authenticationController.loginWithFacebook);

};
