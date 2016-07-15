(function() {
	'use strict';
	
	describe('videoCell component', function() {
		
		var videoCellCtrl = 0;
		var $q, $scope, User, videoApi;
		var element, template;
		
		beforeEach(module('videoPortal'));
		beforeEach(module('my.templates'));
		beforeEach(module(function($provide) {			
			$provide.service('User',function() {
				var username = 'test username';
				this.getUsername = function() {
					return username;
				};
				this.setUsername = function(_username) {
					username=_username;
				};
				this.getSessionId = function() {
					return 'abc123';
				};
			});
			$provide.service('videoApi',function() {
				this.getSingle = function(sessionId,videoId) {
					return $q.when({ status:200, 
									 data: { status:"success",
											 data: {
													_id: 'def456',
													name: '[2] test video name',
													description: 'test description 2',
													url: 'videos/test.mp4',
													ratings: '[1,2,3,4,5]'
													}}
					});
				};				
				this.rateVideo = function(sessionId,videoId,rating) {
					return $q.when({ status:200, data: { status:"success" }});
				};
				
			});
		}));
		beforeEach(inject(function($compile,$componentController,_$q_,$rootScope,$state,_User_,_videoApi_) {
			$q=_$q_;
			$scope = $rootScope.$new();
			User = _User_;
			videoApi = _videoApi_;
			
			videoCellCtrl = $componentController('videoCell', {
				$scope: $scope,
				$state: $state,
				User: User,
				videoApi: videoApi
			});
			
			element = angular.element('<video-cell id="{{id}}" name="{{name}}" description="{{description}}" url="{{url}}" ratings="{{ratings}}"></video-cell>');
			$scope.id = 'abc123';
			$scope.name = '[1] test name';
			$scope.description = 'test description';
			$scope.url = 'videos/test2.mp4';
			$scope.ratings = '[1,2,3,2,1]';
			element = $compile(element)($scope);
			$scope.$apply();
			
		}));
		
		it('should be defined',function() {
			expect(videoCellCtrl).toBeDefined();
			expect(videoCellCtrl).not.toBe(0);
		});	
		
		it("should set the binding: id", function() {
			var findId = element[0].querySelector('a[ng-href]').getAttribute('ng-href');
			expect(findId.search($scope.id)).not.toBe(-1);
		});
		
		it("should set the binding: title", function() {
			var findTitle = element[0].querySelector('a[ng-href]').getAttribute('ng-href');
			expect(findTitle.search(videoCellCtrl.createTitle($scope.name))).not.toBe(-1);
		});
		
		it("should set the binding: name", function() {
			var findA = angular.element(element[0].querySelector('a[ng-href]'));
			expect(findA.text().trim()).toBe($scope.name);
		});
		
		it("should set the binding: description", function() {
			var findDescription = angular.element(element[0].querySelector('.description'));
			expect(findDescription.text().trim()).toBe($scope.description);
		});	
		
		it("should set the binding: rating", function() {
			var findRating = angular.element(element[0].querySelector('.rating'));
			expect(findRating.text().trim().search(/[0-9]{1}\.[0-9]{2}/)).not.toBe(-1);
		});
		
		it("'s addRating and createRating functions should save to the db then update the ratings array",function() {
			videoCellCtrl.ratings = [1,2,3,2,1];
			videoCellCtrl.rating = videoCellCtrl.createRating(videoCellCtrl.ratings);
			expect(videoCellCtrl.rating).toBe(1.8);
			videoCellCtrl.addRating(3);
			$scope.$apply();
			expect(videoCellCtrl.rating).toBe(2);
			expect(videoCellCtrl.rated).toBe(true);
			expect(videoCellCtrl.ratings).toEqual([1,2,3,2,1,3]);
			expect(videoCellCtrl.showRating).toBe(true);
		});

		it("'s createTitle function should create a REST friendly name from the video name", function() {
			expect(videoCellCtrl.createTitle($scope.name)).toBe('test-name');
		});
	});
})();