(function() {

	'use strict';

	describe('loginModal controller', function() {	

		var LMCtrl = 0,$controller,$q,$rootScope;

		var scopeDismissCalled=0;
		var scopeCloseCalled=0;
				
		beforeEach(module('videoPortal.controllers'));
		beforeEach(module(function($provide) {
				$provide.service('authenticate',function() {
					this.login = function(username,password) {
						return $q.when({status:200,
										data: {
											status: 'success',
											username: username,
										}
						});
					};
				});
				$provide.service('md5',function() {
					this.createHash = function(password) {
						return 'hashed'+password;
					};
				});
				
				$provide.service('$scope',function() {
					this.$dismiss = function() {
						scopeDismissCalled=1;
					};
					this.$close = function(obj) {
						scopeCloseCalled=1;
					};
				});
			}));
		
		beforeEach(inject(function($injector) {
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			
			LMCtrl = $controller('LoginModalController');
			
		}));
		
		it('should be defined',function() {
			expect(LMCtrl).toBeDefined();
			expect(typeof LMCtrl).not.toBe('number');
		});
		
		it("\'s cancel method should call $scope.$dismiss)", function() {
			LMCtrl.cancel();
			expect(scopeDismissCalled).toBe(1);
		});
		
		it("\'s submit method should call $scope.$close)", function() {
			LMCtrl.submit('test username','test password');
			
			$rootScope.$digest();
			
			expect(scopeCloseCalled).toBe(1);
		});
	});
})();