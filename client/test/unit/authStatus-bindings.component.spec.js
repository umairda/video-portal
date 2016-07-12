(function() {
	'use strict';
	
	describe('authStatus component', function() {
		
		var authStatusCtrl = 0, $compile, element;
		var $scope, User;
		
		beforeEach(module('videoPortal'));
		beforeEach(module('my.templates'));
		beforeEach(module(function($provide) {			
			$provide.service('User',function() {
				var username = null;
				this.getUsername = function() {
					return username;
				};
				this.setUsername = function(_username) {
					username=_username;
				};
			});
		}));
		beforeEach(inject(function(_$compile_,$componentController,$rootScope,_$state_,$templateCache,_User_) {
			$compile = _$compile_;
			$scope = $rootScope.$new();
			User = _User_;
						
			element = angular.element('<auth-status></auth-status>');
		}));
		
		it('should initially set ng-href to #/list',function() {
			element = $compile(element)($scope);
			$scope.$apply();
			
			var findNgHref = element[0].querySelector('a[ng-href]').getAttribute('ng-href');
			expect(findNgHref).toBe("#/list");
		});
		
		it('should initially display "Sign in" as the link text',function() {
			element = $compile(element)($scope);
			$scope.$apply();
			
			var findTestStatus = angular.element(element[0].querySelector('span.testStatus'));
			expect(findTestStatus.text().trim()).toBe("Sign in");
		});
		
		it('should initially set (but not display) "Signed in as" as the p text',function() {
			element = $compile(element)($scope);
			$scope.$apply();
			
			var findTestStatus = angular.element(element[0].querySelector('p'));
			expect(findTestStatus.text().trim()).toBe("Signed in as");
		});
		
		it('should set ng-href to #/ after a user signs in',function() {
			User.setUsername('test username');
			element = $compile(element)($scope);
			$scope.$apply();
					
			var findNgHref = element[0].querySelector('a[ng-href]').getAttribute('ng-href');
			expect(findNgHref).toBe("#/");
		});
		
		it('should display "Sign out" as the link text after a user signs in out',function() {
			User.setUsername('test username');
			element = $compile(element)($scope);
			$scope.$apply();
			
			var findTestStatus = angular.element(element[0].querySelector('span.testStatus'));
			expect(findTestStatus.text().trim()).toBe("Sign out");
		});
		
		it('should display "Signed in as {username}" as the p text after a user signs in',function() {
			var username = 'test username';
			User.setUsername(username);
			element = $compile(element)($scope);
			$scope.$apply();
			
			var findTestStatus = angular.element(element[0].querySelector('p'));
			expect(findTestStatus.text().trim()).toBe("Signed in as "+username);
		});
		
	});
})();