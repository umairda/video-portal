(function() {
	'use strict';
	
	var videoListController = function(User,videoApi) {
		var vm = this;
		
		//holds the array of video objects for ngRepeat to iterate over
		vm.list = null;
		
		vm.getListings = function(skip,limit) {
			//verify skip is valid whole number or set to 0
			if (!angular.isNumber(skip) || skip<1) {
				skip = 0;
			}
			else {
				skip = Math.floor(skip);
			}
			vm.skip = skip;
			
			//verify limit is valid whole number or set to null
			if (!angular.isNumber(limit) || limit<0) {
				limit = null;
			}
			else {
				limit = Math.floor(limit);
			}
			vm.limit = limit;
			
			//call video api to get array of video objects and store in vm.list if successful
			videoApi.getListings(User.getSessionId(),skip,limit).then(function(response) {
				if (response.data.status === 'success') {
					vm.list = response.data.data;
				}
				else {
					console.log('error getting video list: ',response.status);
				}
			},function(error) {
				console.log('server error getting video list: ',error);
			});
		};
				
		vm.$onInit = function() {
			//initialize vm.list variable
			vm.getListings(vm.skip,vm.limit);
			
			//verify columnClass is a valid string otherwise default to a 4 column setup
			if (!angular.isDefined(vm.columnClass) || !angular.isString(vm.columnClass)) {
				vm.columnClass = "col-md-3";
			}
		};
	};
	
	angular.module('videoPortal.components').component('videoList', {
		bindings: {
			skip: '<?skip',
			limit: '<?limit',
			columnClass: '@?columnClass'
		},
		controller: videoListController,
		templateUrl: "/views/components/videoList.html",
	});
})();