'use strict';

describe('The home view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should include the correct header text', function() {
    expect(page.h1El.getText()).toBe('This is the home page.');
  });

});
