(function() {
  'use strict';

  angular.module('core')
    .controller('NavbarController', function($auth) {

      var service = {
        isAuthenticated: isAuthenticated
      };

      return service;

      function isAuthenticated() {
        return $auth.isAuthenticated();
      }
    });

})();
