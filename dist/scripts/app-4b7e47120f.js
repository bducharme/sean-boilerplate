!function(){"use strict";angular.module("user",["ngStorage"]).config(["$authProvider",function(e){e.google({clientId:""}),e.facebook({clientId:""}),e.github({clientId:""}),e.twitter({clientId:""})}])}(),function(){"use strict";angular.module("user").factory("User",["$resource",function(e){return e("/api/me",{},{})}]).factory("Account",["$resource",function(e){return e("/api/account/:type",{},{updateProfile:{method:"PUT",params:{type:"profile"}},changePassword:{method:"PUT",params:{type:"password"}},deleteAccount:{method:"DELETE",params:{type:"profile"}}})}])}(),function(){"use strict";angular.module("user").directive("passwordMatch",function(){return{require:"ngModel",scope:{otherModelValue:"=passwordMatch"},link:function(e,r,s,o){o.$validators.compareTo=function(r){return r===e.otherModelValue},e.$watch("otherModelValue",function(){o.$validate()})}}})}(),function(){"use strict";angular.module("user").directive("validateEmail",function(){var e=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return{require:"ngModel",restrict:"",link:function(r,s,o,a){a&&a.$validators.email&&(a.$validators.email=function(r){return a.$isEmpty(r)||e.test(r)})}}})}(),function(){"use strict";angular.module("user").controller("SignupController",["$state","$auth",function(e,r){function s(){r.signup(o.user).then(function(s){r.setToken(s),e.go("profile")})["catch"](function(e){o.serverErrors={emailTaken:e.data.message}})}var o=this;return o.service={signup:s},o}])}(),function(){"use strict";angular.module("user").controller("ProfileController",["$auth","$timeout","$state","User","Account",function(e,r,s,o,a){function n(){o.get(function(e){m.user=e})}function t(){a.updateProfile(m.user,function(){m.alert=!0,m.message="Profile was successfully updated.",r(m.service.closeAlert,5e3)},function(e){m.serverErrors={errorUpdate:e.data.message}})}function i(){a.changePassword(m.user,function(){m.alert=!0,m.message="Password was successfully changed.",r(m.service.closeAlert,5e3)},function(e){m.serverErrors={errorChange:e.data.message}})}function l(){a.deleteAccount(m.user,function(){e.removeToken(),s.go("home")},function(e){m.serverErrors={deleteAccount:e.data.message}})}function c(r){e.link(r).then(function(){m.service.getProfile()})["catch"](function(e){m.serverErrors={errorLink:e.data.message}})}function u(r){e.unlink(r).then(function(){m.service.getProfile()})["catch"](function(e){m.serverErrors={errorUnlink:e.data?e.data.message:"Could not unlink "+r+" account"}})}function d(){m.alert=!1}var m=this;return m.service={getProfile:n,updateProfile:t,changePassword:i,deleteAccount:l,link:c,unlink:u,closeAlert:d},m.service.getProfile(),m}])}(),function(){"use strict";angular.module("user").controller("LogoutController",["$state","$auth",function(e,r){r.isAuthenticated()&&r.logout().then(function(){e.go("home")})}])}(),function(){"use strict";angular.module("user").controller("LoginController",["$state","$auth",function(e,r){function s(){r.login(a.user).then(function(){e.go("profile")})["catch"](function(e){a.serverErrors={loginError:e.data.message}})}function o(s){r.authenticate(s).then(function(){e.go("profile")})["catch"](function(e){a.serverErrors={loginError:e.data.message}})}var a=this;return a.service={login:s,authenticate:o},a}])}(),function(){"use strict";angular.module("core",[])}(),function(){"use strict";angular.module("core").controller("NavbarController",["$auth",function(e){function r(){return e.isAuthenticated()}var s={isAuthenticated:r};return s}])}(),function(){"use strict";angular.module("user").config(["$stateProvider",function(e){function r(e,r){var s=e.defer();return r.isAuthenticated()?s.reject():s.resolve(),s.promise}function s(e,r,s){var o=e.defer();return s.isAuthenticated()?o.resolve():r.path("/login"),o.promise}e.state("login",{url:"/login",templateUrl:"app/modules/user/views/login.html",controller:"LoginController",controllerAs:"vm",resolve:{skipIfLoggedIn:r}}).state("signup",{url:"/signup",templateUrl:"app/modules/user/views/signup.html",controller:"SignupController",controllerAs:"vm",resolve:{skipIfLoggedIn:r}}).state("logout",{url:"/logout",template:null,controller:"LogoutController",controllerAs:"logoutVM"}).state("profile",{url:"/profile",templateUrl:"app/modules/user/views/profile.html",controller:"ProfileController",controllerAs:"vm",resolve:{loginRequired:s}}),r.$inject=["$q","$auth"],s.$inject=["$q","$location","$auth"]}])}(),function(){"use strict";angular.module("core").config(["$stateProvider","$urlRouterProvider",function(e,r){r.otherwise("/"),e.state("home",{url:"/",templateUrl:"app/modules/core/views/home.html"})}])}(),function(){"use strict";angular.module("sean-boilerplate",["ngMessages","ngSanitize","ngResource","ngAnimate","ui.router","ui.bootstrap","satellizer","core","user"])}(),angular.module("sean-boilerplate").run(["$templateCache",function(e){e.put("app/modules/core/partials/navbar.html",'<div ng-controller="NavbarController as vm" class="navbar navbar-default navbar-static-top"><div class="navbar-header"><a class="navbar-brand" ui-sref="home">sean-boilerplate</a></div><ul class="nav navbar-nav"><li><a ui-sref="home">Home</a></li><li ng-if="vm.isAuthenticated()"><a ui-sref="profile">Profile</a></li></ul><ul ng-if="!vm.isAuthenticated()" class="nav navbar-nav pull-right"><li><a ui-sref="login">Login</a></li><li><a ui-sref="signup">Sign up</a></li></ul><ul ng-if="vm.isAuthenticated()" class="nav navbar-nav pull-right"><li><a ui-sref="logout">Logout</a></li></ul></div>'),e.put("app/modules/core/views/home.html","<div ng-include=\"'app/modules/core/partials/navbar.html'\"></div><h1>This is the home page.</h1>"),e.put("app/modules/user/partials/profile.account.html",'<legend>Change Password</legend><form method="post" ng-submit="vm.service.changePassword()" name="changePasswordForm"><div class="form-group has-feedback" ng-class="{ \'has-error\' : vm.serverErrors.errorChange}"><input class="form-control input-md" type="password" name="oldPassword" ng-model="vm.user.oldPassword" placeholder="Old Password" required=""><div class="help-block" ng-show="vm.serverErrors" ng-messages="vm.serverErrors"><div ng-message="errorChange">{{vm.serverErrors.errorChange}}</div></div></div><div class="form-group has-feedback" ng-class="{ \'has-error\' : changePasswordForm.newPassword.$invalid && changePasswordForm.newPassword.$dirty }"><input class="form-control input-md" type="password" name="newPassword" ng-model="vm.user.newPassword" placeholder="New Password" required=""><div class="help-block" ng-if="changePasswordForm.newPassword.$dirty" ng-messages="changePasswordForm.newPassword.$error"><div ng-message="required">Password is required.</div></div></div><div class="form-group has-feedback" ng-class="{ \'has-error\' : changePasswordForm.confirmPassword.$invalid && changePasswordForm.confirmPassword.$dirty }"><input password-match="vm.user.newPassword" class="form-control input-md" type="password" name="confirmPassword" ng-model="vm.confirmPassword" placeholder="Confirm Password"><div class="help-block" ng-if="changePasswordForm.confirmPassword.$dirty" ng-messages="changePasswordForm.confirmPassword.$error"><div ng-message="compareTo">Password must match.</div></div></div><button class="btn btn-md btn-info">Change password</button></form><legend>Linked Accounts</legend><div class="has-feedback" ng-class="{ \'has-error\' : vm.serverErrors.errorLink || vm.serverErrors.errorUnlink }"><div class="help-block" ng-show="vm.serverErrors" ng-messages="vm.serverErrors"><div ng-message="errorLink">{{vm.serverErrors.errorLink}}</div><div ng-message="errorUnlink">{{vm.serverErrors.errorUnlink}}</div></div></div><a class="btn btn-block btn-social btn-google" ng-if="vm.user.google" ng-click="vm.service.unlink(\'google\')"><span class="fa fa-google"></span> Unlink Google Account</a> <a class="btn btn-block btn-social btn-google" ng-if="!vm.user.google" ng-click="vm.service.link(\'google\')"><span class="fa fa-google"></span> Link Google Account</a> <a class="btn btn-block btn-social btn-facebook" ng-if="vm.user.facebook" ng-click="vm.service.unlink(\'facebook\')"><span class="fa fa-facebook"></span> Unlink Facebook Account</a> <a class="btn btn-block btn-social btn-facebook" ng-if="!vm.user.facebook" ng-click="vm.service.link(\'facebook\')"><i class="fa fa-facebook"></i>Link Facebook Account</a> <a class="btn btn-block btn-social btn-twitter" ng-if="vm.user.twitter" ng-click="vm.service.unlink(\'twitter\')"><span class="fa fa-twitter"></span> Unlink Twitter Account</a> <a class="btn btn-block btn-social btn-twitter" ng-if="!vm.user.twitter" ng-click="vm.service.link(\'twitter\')"><span class="fa fa-twitter"></span> Link Twitter Account</a> <a class="btn btn-block btn-social btn-github" ng-if="vm.user.github" ng-click="vm.service.unlink(\'github\')"><span class="fa fa-github"></span>Unlink GitHub Account</a> <a class="btn btn-block btn-social btn-github" ng-if="!vm.user.github" ng-click="vm.service.link(\'github\')"><span class="fa fa-github"></span> Link GitHub Account</a><legend>Delete My Account</legend><p>This action is irreversible.</p><button class="btn btn-md btn-danger" ng-click="vm.service.deleteAccount()">Delete Account</button><div class="has-feedback" ng-class="{ \'has-error\' : vm.serverErrors.deleteAccount }"><div class="help-block" ng-show="vm.serverErrors" ng-messages="vm.serverErrors"><div ng-message="deleteAccount">{{vm.serverErrors.deleteAccount}}</div></div></div>'),e.put("app/modules/user/partials/profile.profile.html",'<legend>Edit My Profile</legend><form method="post" ng-submit="vm.service.updateProfile()"><div class="form-group"><label class="control-label">Profile Picture</label> <img class="profile-picture" ng-src="{{vm.user.picture || \'http://placehold.it/100x100\'}}"></div><div class="form-group"><label class="control-label">Email Address</label> <input type="email" class="form-control" ng-model="vm.user.email"></div><div class="has-feedback" ng-class="{ \'has-error\' : vm.serverErrors.errorUpdate }"><div class="help-block" ng-show="vm.serverErrors" ng-messages="vm.serverErrors"><div ng-message="errorUpdate">{{vm.serverErrors.errorUpdate}}</div></div></div><button class="btn btn-md btn-info">Update Information</button></form>'),e.put("app/modules/user/views/login.html",'<div ng-include="\'app/modules/core/partials/navbar.html\'"></div><div class="container"><div class="row"><div class="center-form panel"><div class="panel-body"><h2 class="text-center">Log in</h2><form method="post" ng-submit="vm.service.login()" name="loginForm"><div class="form-group has-feedback" ng-class="{ \'has-error\' : vm.serverErrors }"><input class="form-control input-lg" type="text" name="email" ng-model="vm.user.email" placeholder="Email" required="" autofocus=""> <span class="form-control-feedback"></span></div><div class="form-group has-feedback" ng-class="{ \'has-error\' : vm.serverErrors }"><input class="form-control input-lg" type="password" name="password" ng-model="vm.user.password" placeholder="Password" required=""> <span class="form-control-feedback"></span><div class="help-block" ng-if="loginForm.email.$dirty || loginForm.password.$dirty" ng-messages="vm.serverErrors"><div ng-message="loginError">{{vm.serverErrors.loginError}}</div></div></div><button type="submit" ng-disabled="loginForm.$invalid" class="btn btn-lg btn-block btn-success">Log in</button><br><p class="text-center text-muted"><small>Don\'t have an account yet? <a ui-sref="signup">Sign up</a></small></p><hr></form><button class="btn btn-block btn-social btn-google" ng-click="vm.service.authenticate(\'google\')"><span class="fa fa-google-plus"></span>Sign in with Google</button> <button class="btn btn-block btn-social btn-facebook" ng-click="vm.service.authenticate(\'facebook\')"><span class="fa fa-facebook"></span>Sign in with Facebook</button> <button class="btn btn-block btn-social btn-twitter" ng-click="vm.service.authenticate(\'twitter\')"><span class="fa fa-twitter"></span>Sign in with Twitter</button> <button class="btn btn-block btn-social btn-github" ng-click="vm.service.authenticate(\'github\')"><span class="fa fa-github"></span>Sign in with Github</button></div></div></div></div>'),e.put("app/modules/user/views/profile.html",'<div ng-include="\'app/modules/core/partials/navbar.html\'"></div><div class="container"><div class="alert alert-success clickable" role="alert" ng-click="vm.service.closeAlert()" ng-show="vm.alert"><uib-alert type="success">{{vm.message}}</uib-alert></div><tabset><tab active="true" heading="Profile"><div ng-include="\'app/modules/user/partials/profile.profile.html\'"></div></tab><tab heading="Account"><div ng-include="\'app/modules/user/partials/profile.account.html\'"></div></tab></tabset></div>'),e.put("app/modules/user/views/signup.html",'<div ng-include="\'app/modules/core/partials/navbar.html\'"></div><div class="container"><div class="row"><div class="center-form panel"><div class="panel-body"><h2 class="text-center">Sign up</h2><form method="post" ng-submit="vm.service.signup()" name="signupForm"><div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.email.$invalid && signupForm.email.$dirty || vm.serverErrors }"><input class="form-control input-lg" type="email" id="email" name="email" ng-model="vm.user.email" placeholder="Email" validate-email="" required=""><div class="help-block" ng-if="signupForm.email.$dirty" ng-messages="signupForm.email.$error"><div ng-message="required">Your email address is required.</div><div ng-message="email">Your email address is invalid.</div></div><div class="help-block" ng-if="signupForm.email.$dirty" ng-messages="vm.serverErrors"><div ng-message="emailTaken">{{vm.serverErrors.emailTaken}}</div></div></div><div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.password.$invalid && signupForm.password.$dirty }"><input class="form-control input-lg" type="password" name="password" ng-model="vm.user.password" placeholder="Password" required=""><div class="help-block" ng-if="signupForm.password.$dirty" ng-messages="signupForm.password.$error"><div ng-message="required">Password is required.</div></div></div><div class="form-group has-feedback" ng-class="{ \'has-error\' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }"><input password-match="vm.user.password" class="form-control input-lg" type="password" name="confirmPassword" ng-model="vm.confirmPassword" placeholder="Confirm Password"><div class="help-block" ng-if="signupForm.confirmPassword.$dirty" ng-messages="signupForm.confirmPassword.$error"><div ng-message="compareTo">Password must match.</div></div></div><p class="text-center text-muted"><small>By clicking on Sign up, you agree to <a href="#">terms & conditions</a> and <a href="#">privacy policy</a></small></p><button type="submit" ng-disabled="signupForm.$invalid" class="btn btn-lg btn-block btn-primary">Sign up</button><br><p class="text-center text-muted">Already have an account? <a ui-sref="login">Log in now</a></p></form></div></div></div></div>')}]);