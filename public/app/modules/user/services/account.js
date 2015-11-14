(function() {
  'use strict';

  angular.module('user')
    .factory('User', function($resource) {
      return $resource('/api/me', {} , {});
    })

    .factory('Account', function($resource) {
      return $resource('/api/account/:type', {} , {
        updateProfile: { method: 'PUT', params: {type: 'profile'} },
        changePassword: { method: 'PUT', params: {type: 'password'} },
        deleteAccount: { method: 'DELETE', params: {type: 'profile'}  }
      });
    });

})();
