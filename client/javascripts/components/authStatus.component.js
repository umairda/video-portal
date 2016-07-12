(function() {
	'use strict';
	
	var authStatusController = function($scope,$state,User) {
		var vm = this;
		vm.loggedIn = false;
		vm.username = null;
		vm.route = $state.href("authenticated.list");
		vm.status = 'Sign in';
		vm.href = '/#/list';
				
		vm.update = function() {
			var username = User.getUsername();
			if (angular.isDefined(username) && (username !== null)) {
				vm.username = username;
				vm.status = 'Sign out';
				vm.loggedIn = true;
				vm.route = $state.href("unauthenticated");
				vm.href = '/';
			}
			else {
				vm.status = 'Sign in';
				vm.loggedIn = false;
				vm.route = $state.href("authenticated.list");
				vm.href = '/#/list';
			}
		};
		
		$scope.$watch(function(scope) {
			return User.getUsername(); 
		}, vm.update);
	};
	
	angular.module('videoPortal.components').component('authStatus', {
		bindings: {},
		controller: authStatusController,
		templateUrl: "/views/components/authStatus.html",
	});
})();