(function() {

	'use strict';

	describe('videoApi service', function() {	

		var $httpBackend,videoApi;
				
		beforeEach(module('videoPortal.services'));
		
		beforeEach(inject(function($injector) {
			$httpBackend = $injector.get('$httpBackend');
			videoApi = $injector.get('videoApi');
		}));
		
		it('should be defined',function() {
			expect(videoApi).toBeDefined();
		});
		
		it('should be able to get the video listings with parameters specified (videoApi.getListings)', function(done) {
			$httpBackend.when('GET','/videos?sessionId=abc123&skip=0&limit=1')
						.respond({status:"success",data:[{_id:'def123',name:'[0] test',description:'test description',url:'videos/test.mp4'}]});
			
			videoApi.getListings('abc123',0,1).then(function(response) {
				expect(response.data.status).toBe("success");
				expect(response.data.data).toBeDefined();
				expect(response.data.data[0]._id).toBe('def123');
				expect(response.data.data[0].name).toBe('[0] test');
				expect(response.data.data[0].description).toBe('test description');
				expect(response.data.data[0].url).toBe('videos/test.mp4');
				done();
			});
			
			$httpBackend.flush();
		});

		it('should be able to get the video listings without parameters specified (videoApi.getListings)', function(done) {
			
			$httpBackend.when('GET','/videos?sessionId=abc123&skip=0')
						.respond({status:"success",data:[{_id:'def123',name:'[0] test',description:'test description',url:'videos/test.mp4'}]});
			
			videoApi.getListings('abc123').then(function(response) {
				expect(response.data.status).toBe("success");
				expect(response.data.data).toBeDefined();
				expect(response.data.data[0]._id).toBe('def123');
				expect(response.data.data[0].name).toBe('[0] test');
				expect(response.data.data[0].description).toBe('test description');
				expect(response.data.data[0].url).toBe('videos/test.mp4');
				done();
			});
			
			$httpBackend.flush();
		});
		
		it('should be able to get a single video listing (videoApi.getSingle)', function(done) {
			$httpBackend.when('GET','/video?sessionId=abc123&videoId=456')
						.respond({status:"success",data:[{_id:'def123',name:'[0] test',description:'test description',url:'videos/test.mp4'}]});
			
			videoApi.getSingle('abc123',456).then(function(response) {
				expect(response.data.status).toBe("success");
				expect(response.data.data).toBeDefined();
				expect(response.data.data[0]._id).toBe('def123');
				expect(response.data.data[0].name).toBe('[0] test');
				expect(response.data.data[0].description).toBe('test description');
				expect(response.data.data[0].url).toBe('videos/test.mp4');
				done();
			});
			
			$httpBackend.flush();
		});
	});
})();
