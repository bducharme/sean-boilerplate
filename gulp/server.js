'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');
var server = require( 'gulp-develop-server' );

var BROWSER_SYNC_RELOAD_DELAY = 1000;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ],
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', function onStart() {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function onRestart() {
      setTimeout(function()  {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    })
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
    proxy: 'localhost:3000',
    port: 4000,
    browser: ['google-chrome'],
    notify: true
  });
});

gulp.task('test-server', function() {
  server.listen({
    path: './app.js',
    env: {
      NODE_ENV: 'test',
      SEED: 'seed'
    }
  });
});

gulp.task('prod-test-server', function() {
  server.listen({
    path: './app.js',
    env: {
      NODE_ENV: 'production',
      SEED: 'seed'
    }
  });
});


browserSync.use(browserSyncSpa({
  selector: '[ng-app]'
}));

//Temporary use .start() until gulp 4.0
gulp.task('serve', ['watch'], function () {
  gulp.start('browser-sync');
});

gulp.task('serve:dist', ['build'], function () {
  gulp.start('browser-sync');
});

gulp.task('serve:e2e', ['inject'], function () {
  gulp.start('test-server');
});

gulp.task('serve:e2e-dist', ['build'], function () {
  gulp.start('prod-test-server');
});
