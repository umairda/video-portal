(function() {
	'use strict';
	
	describe('videoWrapper directive', function() {
		
		var element;
		var videoWrapperCtrl = 0;
		var rootScope,$scope;
		
		beforeEach(module('videoPortal'));
		beforeEach(module('my.templates'));
		beforeEach(inject(function($compile,$rootScope) {
			$scope = $rootScope.$new();
			rootScope = $rootScope;
			var temp = spyOn(rootScope,'$broadcast').and.callThrough();
			
			element = angular.element('<video-wrapper aspect-ratio="{{aspectRatio}}" url="{{url}}"></video-wrapper>');
			$scope.aspectRatio = 'embed-responsive-4by3';
			$scope.url = 'videos/Google_Cardboard_Assembly.mp4';
			element = $compile(element)($scope);
			$scope.$apply();
			videoWrapperCtrl = element.controller('videoWrapper');
		}));
		
		it('should be defined',function() {
			expect(videoWrapperCtrl).toBeDefined();
			expect(videoWrapperCtrl).not.toBe(0);
		});	
		
		it('should set the aspectRatio binding',function() {
			var findAspectRatio = element[0].querySelector('div.video-wrapper').getAttribute('class');
			expect(findAspectRatio.search($scope.aspectRatio)).not.toBe(-1);
			expect(videoWrapperCtrl.aspectRatio).toEqual($scope.aspectRatio);
		});
		
		it('should set the url binding',function() {
			var findUrl = element[0].querySelector('source').getAttribute('src');
			expect(findUrl).toEqual($scope.url);
			expect(videoWrapperCtrl.url).toEqual($scope.url);
		});
		
		it('should set the video type',function() {
			var findType = element[0].querySelector('source').getAttribute('type');
			var urlParts = $scope.url.split('\.');
			var extension = urlParts[urlParts.length-1];
			expect(findType).toEqual('video/'+extension);
			expect(videoWrapperCtrl.type).toEqual('video/'+extension);
		});
		
		it('should set the video id',function() {
			var findId = element[0].querySelector('video').getAttribute('id');
			expect(findId).toBeDefined();
			expect(angular.isString(findId)).toBe(true);
		});
		
		xit('should broadcast "stopPlaying" and the videoId on an "onplay" event',function(done) {
			videoWrapperCtrl.videoElement.play().then(function(response) {
				expect(rootScope.$broadcast).toHaveBeenCalledWith('onplay',{message: videoWrapperCtrl.videoId});
				done();
			});
			$scope.$digest();
		});
	});
})();