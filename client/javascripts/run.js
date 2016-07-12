(function() {
	
	'use strict';
	
	var app = angular.module('videoPortal');
	
	app.run(function ($log, $rootScope,$state,authenticate,loginModal,User) {

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			var toStateAuthRequired = toState.data.requireLogin;
			var fromStateSet = typeof fromState !== 'undefined' && fromState.name !== '';
			var fromStateAuthRequired = null;
			if (fromStateSet) {
				fromStateAuthRequired = fromState.data.requireLogin;
			}
			
			//user has not been authenticated
			if (toStateAuthRequired && User.getUsername() === null) {
				event.preventDefault();
			  
				loginModal().then(function () {
					return $state.go(toState.name, toParams);
				}).catch(function () {
					return $state.go('unauthenticated');
				});
			}
			else if (fromStateSet && fromStateAuthRequired && !toStateAuthRequired && User.getUsername() !== null) {
				event.preventDefault();
				authenticate.logout(User.getSessionId()).then(function(response) {
					User.setUsername(null);
					User.setSessionId(null);
					return $state.go(toState.name, toParams);
				}, function(error) {
					console.log('logout unsuccessful: ',error);
				}).catch(function(error) {
					console.log('logout failed:',error);
				});
			}
		});
	});
})();