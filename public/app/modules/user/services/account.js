(function() {
  'use strict';

  angular.module('user')
    .factory('Account', function($resource) {
      return $resource('/api/me', {} , {
        update: {
          method: 'PUT'
        }
      });
    });

})();
