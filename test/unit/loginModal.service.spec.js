(function() {

	'use strict';

	describe('loginModal service', function() {	

		var loginModal,$q,$rootScope;

		var instanceCloseCalled=0;
		var userSetUsernameCalled=0;
		var userSetSessionIdCalled=0; 
				
		beforeEach(module('videoPortal'));
		beforeEach(module(function($provide) {
				$provide.service('$uibModal',function() {
					this.open = function(obj) {
						return {
							close: function(str) { instanceCloseCalled=1; },
							result: $q.when({username:'test',sessionId:'abc123'})
						};
					};
				});
				$provide.service('User',function() {
					this.setUsername = function(username) {
						userSetUsernameCalled=1;
					};
					this.setSessionId = function(sessionId) {
						userSetSessionIdCalled=1;
					};
				});
			}));
		
		beforeEach(inject(function($injector) {
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
			loginModal = $injector.get('loginModal');
		}));
		
		it('should be defined',function() {
			expect(loginModal).toBeDefined();
		});
		
		it('should get an instance from $uibModal.open (loginModal.setUsernameAndSessionId)', function(done) {
			var promise = loginModal();  
			promise.then(function(response) {
				expect(userSetUsernameCalled).toBe(1);
				expect(userSetSessionIdCalled).toBe(1);
				expect(instanceCloseCalled).toBe(1);
				expect(response).toBe('test');
				done();
			});
			
			$rootScope.$digest();
		});
	});
})();