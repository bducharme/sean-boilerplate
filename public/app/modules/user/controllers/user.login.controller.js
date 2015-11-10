(function() {
  'use strict';

  angular.module('user')
    .controller('LoginController', function ($state, $auth) {
      var vm = this;

      vm.service = {
        login: login,
        authenticate: authenticate
      };

      return vm;

      function login() {
        $auth.login(vm.user)
          .then(function () {
            console.log('You have successfully signed in.');
            $state.go('profile');
          })
          .catch(function (response) {
            console.log(response);
          });
      }

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
