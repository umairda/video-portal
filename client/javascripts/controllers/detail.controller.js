(function() {

	'use strict';
	
	var app = angular.module('videoPortal.controllers');
	
	app.controller('DetailController', function ($stateParams) {
		var vm = this;
		vm.id = $stateParams.id;
		vm.title = $stateParams.title;
		console.log($stateParams);
		vm.infiniteScrollArray = [2];
		
		vm.loadMore = function() {
			var last = vm.infiniteScrollArray[vm.infiniteScrollArray.length-1];
			vm.infiniteScrollArray.push(4+last);
		};
	});

})();