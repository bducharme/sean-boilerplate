'use strict';

var path = require('path');
var gulp = require('gulp');
var server = require( 'gulp-develop-server' );

gulp.task('seed', function(){

  server.listen({
    path: './app.js',
    env: {
      NODE_ENV: 'test',
      SEED: true
    }
  });

});
