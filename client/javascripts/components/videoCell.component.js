(function() {
	'use strict';
	
	var videoCellController = function($scope,User,videoApi,$log) {
		//$log.log('videoCell controller ready',this);
		var vm = this;
		vm.rating = 0;
		vm.rated = false;
		vm.showRating = false;
		vm.title = 0;
		vm.type = null;
		var isSet = angular.MyHelpers.isSet;
		
		//Adds user rating to databases
		vm.addRating = function(rating) {
			if (angular.isDefined(rating) && +rating>0) {
				//cast to number
				rating = +rating;
				videoApi.rateVideo(User.getSessionId(),vm.id,rating).then(function(response) {
						if (response.data.status === 'success') {
							//if the rating was added to the db then update the rating
							vm.rated = true;
							if (angular.isString(vm.ratings)) {
								vm.ratings = JSON.parse(vm.ratings);
							}
							vm.ratings.push(rating);
							vm.rating = vm.createRating(vm.ratings);
							vm.showRating = true;
						}
						else {
							console.log('error rating video:',response.data.status);
						}
					}, function(error) {
						console.log('server error while rating video:',error);				
				});
			}
		};
		
		//Calculates average user rating
		vm.createRating = function(ratingsArray) {
			//sum(all ratings)/(number of ratings)
			if (ratingsArray.length>0) {
				vm.rating=0;
				for (var i=0; i<ratingsArray.length; i++) {
					vm.rating+=ratingsArray[i];
				}
				return (vm.rating/ratingsArray.length);
			}
		};
		
		//Sets title which is used by /detail route
		vm.createTitle = function(title) {
			//remove video number [0], [1], etc. and any whitespace that follows
			title = title.toLowerCase().replace(/\[.*\]\s{0,}/g,'');
			//replace any non-alphanumeric characters with dashes 
			return title.replace(/[^a-z0-9]/ig,'-');
		};

		vm.getSingle = function(id) {
			return videoApi.getSingle(User.getSessionId(),id).then(function(response) {
					if (response.data.status === 'success') {
						vm.id = response.data.data._id;
						vm.name = response.data.data.name;
						vm.description = response.data.data.description;
						vm.url = response.data.data.url;
						vm.ratings = response.data.data.ratings;
						
						vm.rating = vm.createRating(vm.ratings);
						vm.title = vm.createTitle(vm.name);
					}
					else {
						console.log('error getting video:',response.data.status);
					}
				}, function(error) {
					console.log('server error while getting video:',error);
			});
		};
		
		vm.update = function() {
			if (isSet(vm.name)) {
				vm.title = vm.createTitle(vm.name);
			}
			if (isSet(vm.ratings)) {
				if (angular.isString(vm.ratings)) {
					try {
						vm.ratings = JSON.parse(vm.ratings);
					} catch(error) {
						if (!angular.isArray(vm.ratings)) {
							//return;
						}
					}
				}
				vm.rating = vm.createRating(vm.ratings);
			}
		};
		
		$scope.$watch(function(scope) {
			return vm.id;
		},function(newValue,oldValue) {		
			if (isSet(vm.id)) {
				if (isSet(vm.name) && 
					isSet(vm.description) && 
					isSet(vm.url) &&
					isSet(vm.ratings)) {
						vm.update();
				}
				else {
					//id defined but nothing else- get details from server		
					vm.getSingle(vm.id).finally(function() {
					});
				}
			}		
		});
	};
	
	angular.module('videoPortal.components').component('videoCell', {
		bindings: {
			id: '@id',
			name: '@name',
			description: '@description',
			url: '@url',
			ratings: '@ratings',
			lineClamp: '@?lineClamp'
		},
		controller: videoCellController,
		templateUrl: "/views/components/videoCell.html",
	});
})();