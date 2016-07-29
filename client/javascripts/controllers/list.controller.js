(function() {

	'use strict';
	
	var app = angular.module('videoPortal.controllers');
	
	app.controller('ListController', function ($scope) {
		var vm = this;
		vm.infiniteScrollArray = [4];
		
		vm.loadMore = function() {
			var last = vm.infiniteScrollArray[vm.infiniteScrollArray.length-1];
			vm.infiniteScrollArray.push(4+last);
			$scope.$apply();
		};
		
		$scope.$on('loadMore', function(event,data) {
			vm.loadMore();
		});
	});

})();