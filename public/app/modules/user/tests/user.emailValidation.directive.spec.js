(function() {
  'use strict';

  describe('Directive: validateEmail', function() {

    beforeEach(module('sean-boilerplate'));

    var element;
    var signupForm;
    var scope;

    beforeEach(inject(function($compile, $rootScope) {
      element = angular.element(
        '<form name="signupForm">' +
        '<input type="email" ng-model="model.email" id="email" name="email" validate-email />' +
        '</form>'
      );
      scope = $rootScope;
      scope.model = { email: null };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should detect valid and invalid email correctly', function() {
      var validEmails = [
        'email@example.com',
        'firstname.lastname@example.com',
        'email@subdomain.example.com',
        '1234567890@example.com',
        'email@example-one.com',
        '_______@example.com',
        'email@example.name',
        'email@example.museum',
        'email@example.co.jp',
        'firstname-lastname@example.com'
      ];

      var invalidEmails = [
        'plainaddress',
        '#@%^%#$@#$@#.com',
        '@example.com',
        'Joe Smith &lt;email@example.com&gt;',
        'email.example.com',
        'email@example@example.com',
        '.email@example.com',
        'email.@example.com',
        'email..email@example.com',
        'あいうえお@example.com',
        'email@example.com (Joe Smith)',
        'email@example',
        'email@-example.com',
        'email@111.222.333.44444',
        'email@example..com',
        'Abc..123@example.com'
      ];

      var i;
      for (i in validEmails) {
        scope.signupForm.email.$setViewValue(validEmails[i]);
        expect(scope.model.email).toEqual(validEmails[i]);
        expect(scope.signupForm.email.$valid).toBe(true);
      }
      for (i in invalidEmails) {
        scope.signupForm.email.$setViewValue(invalidEmails[i]);
        expect(scope.model.email).toBeUndefined();
        expect(scope.signupForm.email.$valid).toBe(false);
      }
    });
  });

})();
