(function() {
  'use strict';

  angular.module('user')
    .controller('LogoutController', function ($state, $auth) {
      if (!$auth.isAuthenticated()) {
        return;
      }
      $auth.logout()
        .then(function() {
          $state.go('home');
        });
    });

})();
