(function() {

	'use strict';

	describe('authenticate service', function() {	

		var auth,$httpBackend;
				
		beforeEach(module('videoPortal.services'));
		
		beforeEach(inject(function($injector) {
			$httpBackend = $injector.get('$httpBackend');
			auth = $injector.get('authenticate');
		}));
		
		it('should be defined',function() {
			expect(auth).toBeDefined();
		});
		
		it('should be able to login (auth.login)', function(done) {
			
			$httpBackend.when('POST','/user/auth')
						.respond({status:"success",sessionId:'someId',username:'test'});
						
			auth.login('test','test2').then(function(response) {
				expect(response.data.status).toBe("success");
				expect(response.data.sessionId).toBeDefined();
				expect(response.data.username).toBeDefined();
				done();
			});
			
			$httpBackend.flush();
		});
		
		it('should be able to logout', function(done) {
			$httpBackend.when('GET','/user/logout?sessionId='+123)
						.respond({status:"success"});
						
			auth.logout(123).then(function(response) {
				expect(response.data.status).toBe("success");
				done();
			});
			
			$httpBackend.flush();
		});			
	});
})();
