/***

	stopLoadOnChange is a directive used to cancel the loading of any videos 
	that weren't fully loaded when the state changed. This is accomplished by
	setting the src attribute to '' and then forcing the video to load.

***/

(function() {
	'use strict';

	angular.module('videoPortal.directives').directive('stopLoadOnChange', ['$log','$rootScope', function($log,$rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$rootScope.$on('$viewContentLoaded', function() {
					element[0].setAttribute('src','');
					
					try {
						if (element[0].tagName.toLowerCase() === 'video') {
							element[0].load();
						}
					} catch(err) {
						//catches errors from loading non-video elements
					}
					element[0].remove();
				});
			}
		};
	}]);

})();