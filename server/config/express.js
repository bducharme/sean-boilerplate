'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./env');
var passport = require('passport');

module.exports = function(app) {
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  var env = app.get('env');

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'dist')));
    //app.set('appPath', config.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, '.tmp/serve')));
    app.use(express.static(path.join(config.root, 'public')));
    //app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler());
  }

};
