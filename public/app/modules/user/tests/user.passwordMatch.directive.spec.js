(function() {
  'use strict';

  describe('Directive: comparePassword', function() {

    beforeEach(module('sean-boilerplate'));

    var element;
    var scope;

    beforeEach(inject(function($compile, $rootScope) {
      element = angular.element(
        '<form name="signupForm">' +
        '<input password-match="model.password" type="password" name="confirmPassword" ng-model="model.confirmPassword">' +
        '<div ng-if="signupForm.confirmPassword.$dirty" ng-messages="signupForm.confirmPassword.$error">' +
        '<div ng-message="compareTo">Password must match.</div>' +
        '</div>' +
        '</form>'
      );
      scope = $rootScope;
      scope.model = {
        password: 'password'
      };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should compare password correctly', function() {
      var matchingPassword = 'password';
      var NonMatchingPassword = ['', 'password ', 'PASSWORD', 'passwor', ' password', 'password子'];

      scope.signupForm.confirmPassword.$setViewValue(matchingPassword);
      expect(scope.signupForm.confirmPassword.$valid).toBe(true);

      for (var i in NonMatchingPassword) {
        scope.signupForm.confirmPassword.$setViewValue(NonMatchingPassword[i]);
        expect(scope.signupForm.confirmPassword.$valid).toBe(false);
      }
    });
  });

})();
