(function() {
	
	'use strict';

	var app = angular.module('videoPortal.controllers');

	var HeadController = function(Page,$rootScope) {
		var vm = this;
		vm.page = Page;
		vm.page.setTitle('Video Portal');
		
		$rootScope.$on('loading:progress',function() {

		});
		
		$rootScope.$on('loading:finish',function() {

		});
	};

	app.controller('HeadController',HeadController);

})();