(function() {

	'use strict';
	
	var app = angular.module('videoPortal.services');
	
	app.service('videoApi', function ($http) {
		var vm = this;
		
		vm.getListings = function(sessionId,skip,limit) {
			var limitQuery = '';
			
			//skip 0 videos if skip is not set
			if (typeof skip === 'undefined') {
				skip = 0;
			}
			if (typeof limit !== 'undefined') {
				limitQuery = '&limit='+limit;
			}
			
			return $http({
				method: 'GET',
				url: '/videos?sessionId='+sessionId+'&skip='+skip+limitQuery,
			});
		};
		
		vm.getSingle = function(sessionId,videoId) {
			return $http({
				method: 'GET',
				url: '/video?sessionId='+sessionId+'&videoId='+videoId,					
			});
		};
		
		vm.rateVideo = function(sessionId,videoId,rating) {
			return $http({
				method: 'POST',
				url: '/video/ratings?sessionId='+sessionId,
				data: { videoId: videoId, rating: rating }
			});
		};
	});

})();
