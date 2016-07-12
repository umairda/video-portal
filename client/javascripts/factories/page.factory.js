/***

	A factory for dynamically setting the page title

***/

(function() {
	'use strict';

	angular.module('videoPortal.factories')

	.factory('Page', function() {		
	   var title = 'default';
	   
	   return {
		 title: function() { return title; },
		 setTitle: function(newTitle) { title = newTitle; }
	   };	
	});
})();