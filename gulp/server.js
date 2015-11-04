'use strict';

var path = require('path');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');

var BROWSER_SYNC_RELOAD_DELAY = 1000;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function()  {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    browser: ['google-chrome'],

    notify: true
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
  gulp.start('browser-sync');
});

gulp.task('serve:e2e-dist', ['build'], function () {
  gulp.start('browser-sync');
});
