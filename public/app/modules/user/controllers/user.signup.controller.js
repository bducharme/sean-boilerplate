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
          })
          .catch(function(response) {
            vm.serverErrors = {
              "emailTaken" : response.data.message
            };
          });
      }

    });

})();
