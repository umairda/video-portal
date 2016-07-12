(function() {

	'use strict';
	
	var app = angular.module('videoPortal.controllers');
	
	app.controller('LoginModalController', function ($scope, authenticate, md5) {
		var vm = this;
		vm.invalidPassword = false;
		vm.cancel = $scope.$dismiss;

		vm.submit = function (username, password) {
			authenticate.login(username,md5.createHash(password)).then(function (response) {
				if (typeof response !== 'undefined') {
					if (response.data.status === 'success') {
						if (response.data.username === username) {
							$scope.$close(response.data);
						}
						else {
							console.log('wrong username logged in, expecting: ', username, ' received: ', response.username);
						}
					}
					else {
						//invalid password
						console.log('error logging in: ', response.data.status);
						vm.invalidPassword = true;
					}
				}
				else {
					console.log('response is undefined');
				}
			}, function (error) {
				console.log('Authentication login error: ',error);
			});
		};
	});

})();