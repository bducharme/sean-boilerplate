(function() {
  'use strict';

  angular.module('user')
    .controller('LoginController', function ($state, $auth) {

      var service = {
        authenticate: authenticate
      };

      return service;

      function authenticate(provider) {
        $auth.authenticate(provider)
          .then(function () {
            console.log('You have successfully signed in with ' + provider);
            $state.go('profile');
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    });

})();
