(function() {
	'use strict';

	angular.module('videoPortal.directives').directive('whenScrolledBroadcast', function($document,$rootScope) {
		return function(scope, elm, attr) {
			var raw = elm[0];
			var message = attr.whenScrolledBroadcast;
						
			raw.style.height = window.innerHeight+"px";
			window.onresize = function() {
				raw.style.height = window.innerHeight+"px";
			};
			
			var vm = this;
			vm.scrollHandler = function() {
				//console.log('raw.scrollHeight',raw.scrollHeight);
				//console.log('raw.scrollTop',raw.scrollTop);
				//console.log('raw.offsetHeight',raw.offsetHeight);
				
				if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
					$rootScope.$broadcast(message,{});
				}
			};
			
			$document.bind('scroll',vm.scrollHandler);
		};
	});
})();