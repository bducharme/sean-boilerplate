'use strict';

describe('The home view', function () {
  var homePage;

  beforeEach(function () {
    browser.get('/index.html');
    homePage = require('./main.po');
  });

  it('should include the correct header text', function() {
    expect(homePage.h1El.getText()).toBe('This is the home page.');
  });

});
