(function() {

	'use strict';
	
	var app = angular.module('videoPortal.controllers');
	
	app.controller('ListController', function () {
		var vm = this;
		vm.infiniteScrollArray = [0];
		
		vm.loadMore = function() {
			var last = vm.infiniteScrollArray[vm.infiniteScrollArray.length-1];
			vm.infiniteScrollArray.push(4+last);
		};
	});

})();