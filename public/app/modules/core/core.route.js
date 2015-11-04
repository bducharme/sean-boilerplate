(function() {
  'use strict';

  angular.module('core')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .otherwise("/");

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/modules/core/views/home.html'
        });
    });

})();
