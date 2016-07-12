(function() {
	'use strict';
	
	describe('authStatus component', function() {
		
		var authStatusCtrl = 0;
		var $scope, User;
		
		beforeEach(module('videoPortal'));
		beforeEach(module('my.templates'));
		beforeEach(module(function($provide) {			
			$provide.service('User',function() {
				var username = 'test username';
				this.getUsername = function() {
					return username;
				};
				this.setUsername = function(_username) {
					username=_username;
				};
			});
		}));
		beforeEach(inject(function($componentController,$rootScope,_$state_,_User_) {
			$scope = $rootScope.$new();
			User = _User_;
			
			authStatusCtrl = $componentController('authStatus', {
				$scope: $scope,
				$state: _$state_,
				User: User
			});		
		}));
		
		it('should be defined',function() {
			expect(authStatusCtrl).toBeDefined();
			expect(authStatusCtrl).not.toBe(0);
		});	
		
		it("\'s loggedIn, username, and status variables should be initialized",function() {
			expect(authStatusCtrl.loggedIn).toBe(false);
			expect(authStatusCtrl.username).toBe(null);
			expect(authStatusCtrl.status).toBe('Sign in');
		});
		
		it("\'s update method should set all the variables",function() {
			authStatusCtrl.update();
			expect(authStatusCtrl.loggedIn).toBe(true);
			expect(authStatusCtrl.username).toBe('test username');
			expect(authStatusCtrl.status).toBe('Sign out');
		});
		
		it("should update the variables if User.username changes",function() {
			expect(authStatusCtrl.username).toBe(null);
			expect(authStatusCtrl.loggedIn).toBe(false);
			User.setUsername('Bob');
			$scope.$digest();
			expect(authStatusCtrl.username).toBe('Bob');
			expect(authStatusCtrl.loggedIn).toBe(true);
			expect(authStatusCtrl.status).toBe('Sign out');
		});
	});
})();