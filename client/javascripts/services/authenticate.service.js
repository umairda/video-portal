(function() {

	'use strict';
	
	var app = angular.module('videoPortal.services');
	
	app.service('authenticate', function ($http) {
		var vm = this;
		
		vm.login = function(username,password) {
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/user/auth',
				data: {	username: username, password: password }
			});
		};
		
		vm.logout = function(sessionId) {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/user/logout?sessionId='+sessionId				
			});
		};
	});
})();