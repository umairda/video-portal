(function() {
	'use strict';
	
	var videoWrapperController = function($scope,$timeout,$log) {
		var vm = this;
		var isSet = angular.MyHelpers.isSet;
		vm.posterLink = '';
		vm.type = '';
		vm.videoId = 'v'+Math.floor(Math.random()*1000000);
		
		vm.createPosterLinkFromUrl = function(url) {
			var urlParts = url.split('/');
			var filename = urlParts[urlParts.length-1];
			var fileParts = filename.split('\.');
			var extension = fileParts[fileParts.length-1];
			
			var posterFilename = filename.replace(extension,'gif');
			
			return '/images/'+posterFilename;
		};
		
		vm.createType = function(url) {
			var urlParts = url.split('.');
			return "video/"+urlParts[urlParts.length-1];
		};
		
		$scope.$on('stopPlaying', function(event,args) {
			if (args.message !== vm.videoId) {
				vm.videoElement.pause();
			}
		});
		
		$scope.$watch(function(scope) {
			return vm.url;
		},function(newValue,oldValue) {
			if (isSet(vm.url)) {
				if (!isSet(vm.videoElement)) {
					vm.videoElement = document.getElementById(vm.videoId);
				}
				vm.posterLink = vm.createPosterLinkFromUrl(vm.url);
				vm.type = vm.createType(vm.url);
				vm.videoElement.load();
			}
		});
		
		vm.$onInit = function() {
			if (!isSet(vm.videoElement)) {
				vm.videoElement = document.getElementById(vm.videoId);
			}
			//default video aspect ratio is 4x3
			if (!isSet(vm.aspectRatio)) {
				vm.aspectRatio = 'embed-responsive-4by3';
			}
		};
	};
	
	angular.module('videoPortal.directives').directive('videoWrapper', ['$log','$rootScope',function($log,$rootScope) {
		return {
			restrict: 'E',
			bindToController: {
				aspectRatio: '@?aspectRatioClass',
				url: '@url',
				videoId: '&videoId'
			},
			controller: videoWrapperController,
			controllerAs: 'ctrl',
			link: function link(scope,element,attrs,ctrl) {
				var videoElement = element.find('video');
				videoElement = videoElement[0];
				videoElement.onloadstart = function() {
					//console.log('load start',ctrl.videoId);
				};
				videoElement.oncanplay = function() {
					//console.log('can play load',ctrl.videoId);
					videoElement.pause();
				};
				videoElement.onplay = function() {
					$rootScope.$broadcast('stopPlaying', { message: ctrl.videoId });
				};
				ctrl.videoElement = videoElement;
			},
			templateUrl: "/views/directives/videoWrapper.html",
		};
	}]);
})();