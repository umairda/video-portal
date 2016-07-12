(function() {
	
	'use strict';

	angular.module('videoPortal.factories')

	.factory('User', function() {		
	   var username = null;
	   var sessionId = null;
	   
	   return {
		 getUsername: function() { return username; },
		 getSessionId: function() { return sessionId; },
		 setUsername: function(newUsername) { username = newUsername; },
		 setSessionId: function(newSessionId) { sessionId = newSessionId; },
	   };	
	});
})();