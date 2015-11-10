'use strict';

describe('The login view', function () {
  var loginPage;
  var profileURL = 'http://localhost:3000/#/profile';

  beforeEach(function () {
    browser.get('http://localhost:3000/#/login');
    loginPage = require('./login.po');
  });

  it('should redirect to profile on valid login', function() {
    loginPage.setEmail('valid@valid.valid');
    loginPage.setPassword('valid');
    loginPage.login().then(function() {
      browser.getCurrentUrl().then(function(currentUrl) {
        expect(currentUrl).toEqual(profileURL);
      });
    })
  });

});
