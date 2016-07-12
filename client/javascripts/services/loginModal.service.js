(function() {

	'use strict';
	
	var app = angular.module('videoPortal.services');
	
	app.service('loginModal', function ($uibModal, User) {

		function setUsernameAndSessionId(response) {
			User.setUsername(response.username);
			User.setSessionId(response.sessionId);
			return response.username;
		}

		return function() {
			var instance = $uibModal.open({
			  templateUrl: 'views/loginModalTemplate.html',
			  controller: 'LoginModalController',
			  controllerAs: 'LMCtrl'
			});

			return instance.result.then(setUsernameAndSessionId, instance.close('login cancelled'));
		};

	});

})();