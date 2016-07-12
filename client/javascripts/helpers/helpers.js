(function() {
	'use strict';

	var app = angular.module('videoPortal.helpers',[]);
	
	app.run([function() {
	
		angular.MyHelpers = angular.MyHelpers || {};
		
		var myHelpers = {
			isSet: function(aVar) {
				var defined = false;
				if (angular.isDefined(aVar)) {
					switch(typeof aVar) {
						case 'string': 
							defined = (aVar.trim() !== ''); 
							break;
						case 'object': 
							defined = (angular.isObject(aVar)); 
							break;						
					}	
				}
				return defined;
			}
		};
		
		angular.extend(angular.MyHelpers,myHelpers);
	}]);
})();