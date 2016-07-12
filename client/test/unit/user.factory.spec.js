(function() {

	'use strict';

	describe('User', function() {	

			var User;
					
			beforeEach(module('videoPortal.factories'));
			
			beforeEach(inject(function($injector) {
				User = $injector.get('User');
			}));
			
			it('should be defined',function() {
				expect(User).toBeDefined();
			});
			
			it('should set the username', function() {
				expect(User.getUsername()).toBe(null);
				User.setUsername('test');
				expect(User.getUsername()).toBe('test');
			});
			
			it('should set the sessionId', function() {
				expect(User.getSessionId()).toBe(null);
				User.setSessionId('123abc');
				expect(User.getSessionId()).toBe('123abc');
			});
			
	});
})();