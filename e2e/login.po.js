'use strict';

var LoginPage = function() {
  this.email = element(by.model('vm.user.email'));
  this.password = element(by.model('vm.user.password'));

  this.setEmail = function(value) {
    this.email.sendKeys(value);
  };
  this.setPassword = function(value) {
    this.password.sendKeys(value);
  };
  this.login = function() {
    return element(by.name('loginForm')).click();
  }
};

module.exports = new LoginPage();
