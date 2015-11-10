(function() {
  'use strict';

  angular.module('user')
    .controller('SignupController', function ($state, $auth) {
      var vm = this;

      vm.service = {
        signup: signup
      };

      return vm;

      function signup() {
        $auth.signup(vm.user)
          .then(function(response) {
            $auth.setToken(response);
            $state.go('profile');
            console.log('You have successfully created a new account and have been signed-in');
          })
          .catch(function(response) {
            console.log(response.data.message);
          });
      }
    });
})();
