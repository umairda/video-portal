(function() {
	
	'use strict';
	
	var app = angular.module('videoPortal');
	
	app.config(function ($stateProvider,$urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
		.state('unauthenticated', {
			url: '/',
			templateUrl:"partials/unauthenticated.html",
			data: {
				requireLogin: false
			}
		})
		.state('authenticated', {
			abstract: true,
			data: {
				requireLogin: true 
			},
			templateUrl:"partials/authenticated.html"
		})
		.state('authenticated.list', {
			url: '/list',
			templateUrl:"partials/authenticated.list.html",
			controller: 'ListController',
			controllerAs: 'listCtrl'
		})
		.state('authenticated.detail', {
			url: '/detail/:title/:id',
			templateUrl:"partials/authenticated.detail.html",
			controller:'DetailController',
			controllerAs: 'detailCtrl'
		});
	});

})();