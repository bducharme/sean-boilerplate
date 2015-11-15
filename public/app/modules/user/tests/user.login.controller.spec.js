(function() {
  'use strict';

  describe('Controller: LoginController', function() {

    beforeEach(module('sean-boilerplate'));

    var loginController;
    var mockAuthService;

    beforeEach(inject(function($controller, $auth) {
      mockAuthService = $auth;
      spyOn(mockAuthService, 'authenticate').and.callThrough();
      spyOn(mockAuthService, 'login').and.callThrough();
      loginController = $controller('LoginController');

    }));

    it('should call login on $auth service', function() {
      loginController.service.login();
      expect(mockAuthService.login).toHaveBeenCalled();
    });

    it('should call authenticate on $auth service with valid provider', function() {
      loginController.service.authenticate('twitter');
      expect(mockAuthService.authenticate).toHaveBeenCalled();
    });
  });

})();
