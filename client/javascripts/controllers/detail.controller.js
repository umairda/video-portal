(function() {

	'use strict';
	
	var app = angular.module('videoPortal.controllers');
	
	app.controller('DetailController', function ($stateParams) {
		var vm = this;
		vm.id = $stateParams.id;
		vm.title = $stateParams.title;
	});

})();