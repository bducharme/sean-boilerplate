(function() {
  'use strict';

  angular.module('user')
    .controller('LogoutController', function ($state, $auth) {
      if (!$auth.isAuthenticated()) {
        return;
      }
      $auth.logout()
        .then(function() {
          console.log('You have been logged out');
          $state.go('home');
        });
    });

})();
