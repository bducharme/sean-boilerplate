(function() {
  'use strict';

  angular.module('user')
    .directive('validateEmail', function() {
      var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

      return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, element, attributes, ngModel) {
          if (ngModel && ngModel.$validators.email) {
            ngModel.$validators.email = function (modelValue) {
              return ngModel.$isEmpty(modelValue) || emailRegex.test(modelValue);
            };
          }
        }
      };
    });

})();
