(function() {
  'use strict';

  angular.module('user')
  .controller('ProfileController', function($auth, $timeout, Account) {
      var vm = this;

      vm.service = {
        getProfile: getProfile,
        updateProfile: updateProfile,
        link: link,
        unlink: unlink,
        closeAlert: closeAlert
      };

      vm.service.getProfile();

      return vm;

      function getProfile() {
        Account.get(function(response) {
          vm.user = response;
        });
      }

      function updateProfile() {
        Account.update(vm.user,
          function() {
            vm.alert = true;
            $timeout(vm.service.closeAlert, 5000);
        }, function(err) {
          vm.serverErrors = {
            "errorUpdate" : err
          };
        });
      }

      function link(provider) {
        $auth.link(provider)
          .then(function() {
            vm.service.getProfile();
          })
          .catch(function(response) {
            vm.serverErrors = {
              "errorLink" : response.data.message
            };
          });
      }

      function unlink(provider) {
        $auth.unlink(provider)
          .then(function() {
            vm.service.getProfile();
          })
          .catch(function(response) {
            vm.serverErrors = {
              "errorUnlink" : response.data ? response.data.message : 'Could not unlink ' + provider + ' account'
            };
          });
      }

      function closeAlert() {
        vm.alert = false;
      }

  });

})();
