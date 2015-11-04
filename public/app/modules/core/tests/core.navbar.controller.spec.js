(function() {
  'use strict';

  describe('Controller: NavbarController', function() {

    beforeEach(module('sean-boilerplate'));

    var navbarController;
    var mockAuthService;

    beforeEach(inject(function($controller, $auth) {
      mockAuthService = $auth;
      spyOn(mockAuthService, 'isAuthenticated').and.callThrough();
      navbarController = $controller('NavbarController', {
        $auth: mockAuthService
      });
    }));

    it('should call isAuthenticated on $auth service', function() {
      navbarController.isAuthenticated();
      expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    });
  });

})();
