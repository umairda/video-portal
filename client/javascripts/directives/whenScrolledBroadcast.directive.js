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
				//console.log('$(window).scrollTop()',$(window).scrollTop());
				//console.log('$document.scrollTop',$document.scrollTop());
				//console.log('raw.offsetHeight',raw.offsetHeight);
				
				if ($document.scrollTop() + raw.offsetHeight >= raw.scrollHeight) {
					$rootScope.$broadcast(message,{ scrollTop: $document.scrollTop() });
				}
			};
			
			$document.bind('scroll',vm.scrollHandler);
		};
	});
})();