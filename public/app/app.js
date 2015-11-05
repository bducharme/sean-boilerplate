(function() {
  'use strict';

  angular.module('sean-boilerplate', [
    'ngSanitize',
    'ngResource',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'satellizer',
    'core',
    'user'
  ])

  .config(function($authProvider) {
    $authProvider.google({
      clientId: ''
    });
  })
  .config(function($authProvider) {
    $authProvider.facebook({
      clientId: ''
    });
  })
  .config(function($authProvider) {
    $authProvider.github({
      clientId: ''
    });
  });

})();
