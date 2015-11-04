'use strict';

var path = require('path');
var gulp = require('gulp');

var Server = require('karma').Server

function runTests (singleRun, done) {
  var config = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  };

  var server = new Server(config, function() {
    done();
  });

  server.start();
}

gulp.task('test', ['scripts'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['watch'], function(done) {
  runTests(false, done);
});
