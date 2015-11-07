(function() {
  'use strict';

  describe('Controller: LoginController', function() {

    beforeEach(module('sean-boilerplate'));

    var loginController;
    var mockAuthService;

    beforeEach(inject(function($controller, $auth) {
      mockAuthService = $auth;
      spyOn(mockAuthService, 'authenticate').and.callThrough();
      loginController = $controller('LoginController', {
        $auth: mockAuthService
      });
    }));

    it('should call authenticate on $auth service', function() {
      loginController.authenticate('twitter');
      expect(mockAuthService.authenticate).toHaveBeenCalled();
    });
  });

})();
