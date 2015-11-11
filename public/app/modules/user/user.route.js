(function() {
  'use strict';

  angular.module('user')
    .config(function ($stateProvider) {

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/modules/user/views/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'app/modules/user/views/signup.html',
          controller: 'SignupController',
          controllerAs: 'vm',
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('logout', {
          url: '/logout',
          template: null,
          controller: 'LogoutController',
          controllerAs: 'logoutVM'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'app/modules/user/views/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          resolve: {
            loginRequired: loginRequired
          }
        });

      function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.reject();
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }

      function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.resolve();
        } else {
          $location.path('/login');
        }
        return deferred.promise;
      }

    });

})();
