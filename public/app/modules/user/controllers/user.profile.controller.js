(function() {
  'use strict';

  angular.module('user')
    .controller('ProfileController', function($auth, $timeout, $state, User, Account) {
      var vm = this;

      vm.service = {
        getProfile: getProfile,
        updateProfile: updateProfile,
        changePassword: changePassword,
        deleteAccount: deleteAccount,
        link: link,
        unlink: unlink,
        closeAlert: closeAlert
      };

      vm.service.getProfile();

      return vm;

      function getProfile() {
        User.get(function(response) {
          vm.user = response;
        });
      }

      function updateProfile() {
        Account.updateProfile(vm.user,
          function() {
            vm.alert = true;
            vm.message = 'Profile was successfully updated.';
            $timeout(vm.service.closeAlert, 5000);
        }, function(response) {
          vm.serverErrors = {
            "errorUpdate" : response.data.message
          };
        });
      }

      function changePassword() {
        Account.changePassword(vm.user,
          function() {
            vm.alert = true;
            vm.message = 'Password was successfully changed.';
            $timeout(vm.service.closeAlert, 5000);
          }, function(response) {
            vm.serverErrors = {
              "errorChange" : response.data.message
            };
          });
      }

      function deleteAccount() {
        Account.deleteAccount(vm.user,
          function() {
            $auth.removeToken();
            $state.go('home');
          }, function(response) {
            vm.serverErrors = {
              "deleteAccount" : response.data.message
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
