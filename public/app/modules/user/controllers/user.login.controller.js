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
            $state.go('profile');
          })
          .catch(function (response) {
            vm.serverErrors = {
              "loginError" : response.data.message
            };
          });
      }

      function authenticate(provider) {
        $auth.authenticate(provider)
          .then(function () {
            $state.go('profile');
          })
          .catch(function (response) {
            vm.serverErrors = {
              "loginError" : response.data.message
            };
          });
      }
    });

})();
