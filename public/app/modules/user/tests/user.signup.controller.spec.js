(function() {
  'use strict';

  describe('Controller: SignupController', function() {

    beforeEach(module('sean-boilerplate'));

    var signupController;
    var mockAuthService;

    beforeEach(inject(function($controller, $auth) {
      mockAuthService = $auth;
      spyOn(mockAuthService, 'signup').and.callThrough();
      signupController = $controller('SignupController');
    }));

    it('should call signup on $auth service', function() {
      signupController.service.signup();
      expect(mockAuthService.signup).toHaveBeenCalled();
    });
  });

})();
