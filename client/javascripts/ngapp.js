(function() {

	'use strict';

	angular.module('videoPortal.components', []);	
	angular.module('videoPortal.controllers', []);
	angular.module('videoPortal.directives', []);	
	angular.module('videoPortal.factories', []);
	angular.module('videoPortal.services', []);
	
	angular.module('videoPortal', [
		'angular-md5',
		'ui.router',
		'ui.bootstrap',
		'jkAngularRatingStars',
		'videoPortal.helpers',
		'videoPortal.components',
		'videoPortal.controllers',
		'videoPortal.directives',
		'videoPortal.factories',
		'videoPortal.services'
	]);

})();