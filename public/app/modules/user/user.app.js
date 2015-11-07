(function() {
  'use strict';

  angular.module('user', [
    'ngStorage'
  ])

    .config(function($authProvider) {
      $authProvider.google({
        clientId: ''
      });

      $authProvider.facebook({
        clientId: ''
      });

      $authProvider.github({
        clientId: ''
      });

      $authProvider.twitter({
        clientId: ''
      });
    });

})();
