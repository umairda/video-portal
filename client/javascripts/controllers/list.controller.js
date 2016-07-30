(function() {

	'use strict';
	
	var app = angular.module('videoPortal.controllers');
	
	app.controller('ListController', function ($scope) {
		var vm = this;
		var minScrollToLoadMore = 15;
		
		vm.infiniteScrollArray = [{ skip:4, scrollTop: 0 }];
		
		vm.loadMore = function(data) {
			var last = vm.infiniteScrollArray[vm.infiniteScrollArray.length-1];
			
			//reject redundant broadcasts
			if ((data.scrollTop-last.scrollTop)>minScrollToLoadMore) {
				vm.infiniteScrollArray.push({skip:4+last.skip,scrollTop:data.scrollTop});
				$scope.$apply();
			}
		};
		
		$scope.$on('loadMore', function(event,data) {
			vm.loadMore(data);
		});
	});

})();