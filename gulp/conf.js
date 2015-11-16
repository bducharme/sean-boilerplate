'use strict';

var gutil = require('gulp-util');

exports.paths = {
  src: 'public',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

exports.wiredep = {
  exclude: [/jquery/, /bootstrap.js$/],
  directory: 'public/bower_components'
};

exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
