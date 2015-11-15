'use strict';

describe('The login view', function () {
  var loginPage = require('./login.po');
  var profileURL = 'http://localhost:3000/#/profile';
  var loginURL = 'http://localhost:3000/#/login';

  beforeEach(function () {
    browser.get(loginURL);
  });

  it('should keep invalid login on this page', function() {
    loginPage.setEmail('invalid');
    loginPage.setPassword('password');
    loginPage.login().then(function() {
      browser.getCurrentUrl().then(function(currentUrl) {
        expect(currentUrl).toEqual(loginURL);
      });
    })
  });

  it('should redirect to profile with user in scope on valid login', function() {
    loginPage.setEmail('test@test.com');
    loginPage.setPassword('password');
    loginPage.login().then(function() {
      browser.getCurrentUrl().then(function (currentUrl) {
        expect(currentUrl).toEqual(profileURL);
      });
      element(by.model('vm.user.email')).getAttribute('value').then(function (value) {
        expect(value).toEqual('test@test.com');
      });
    });
  });

});
