(function() {
	'use strict';
	
	describe('videoList component', function() {		
		var videoListCtrl = 0;
		var $q, $scope;
		var element, _data = [], dataCount = 5;
		
		beforeEach(module('videoPortal.components'));
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
				this.getListings = function(sessionId,skip,limit) {
					_data = [];
					for (var i=0; i<dataCount; i++) {
						_data.push({	_id: 'id'+i,
										name: '['+i+'] test',
										description: 'test description '+i,
										url: 'videos/test'+i+'.mp4',
										ratings: '['+[i,i,i,i,i]+']'});
					}
					return $q.when({ status:200, 
									 data: { status:"success",data: _data}
					});
				};								
			});
		}));
		beforeEach(inject(function($compile,_$q_,$rootScope) {
			$q=_$q_;
			$scope = $rootScope.$new();
			
			element = angular.element('<video-list></video-list>');
			element = $compile(element)($scope);
			$scope.$apply();
			videoListCtrl = element.controller('videoList');
		}));
		
		it("'s controller should be defined",function() {
			expect(videoListCtrl).toBeDefined();
			expect(videoListCtrl).not.toBe(0);
		});	
		
		it("should set the skip binding",function() {
			expect(videoListCtrl.skip).toBe(0);
		});
		
		it("should set the limit binding",function() {
			expect(videoListCtrl.limit).toBe(null);
		});
		
		it("should set the columnClass binding",function() {
			expect(videoListCtrl.columnClass).toBe('col-md-3');
			var findColumnClass = element[0].querySelector('div.test-column-class').getAttribute('class');
			expect(findColumnClass.search('col-md-3')).not.toBe(-1);
		});
		
		it("should create 5 video cells", function() {
			var findVideoCells = element[0].querySelectorAll('video-cell');
			expect(findVideoCells.length).toBe(dataCount);
		});
		
		it("should set the bindings of each video cells", function() {
			var findVideoCells = element[0].querySelectorAll('video-cell');
			for (var j=0; j<findVideoCells.length; j++) {
				var findId = findVideoCells[j].getAttribute('id');
				expect(findId.search(_data[j]._id)).not.toBe(-1);
				var findName = findVideoCells[j].getAttribute('name');
				expect(findName).toEqual(_data[j].name);
				var findDescription = findVideoCells[j].getAttribute('description');
				expect(findDescription.search(_data[j].description)).not.toBe(-1);
				var findUrl = findVideoCells[j].getAttribute('url');
				expect(findUrl.search(_data[j].url)).not.toBe(-1);
				var findRatings = findVideoCells[j].getAttribute('ratings');
				expect(findRatings.search(_data[j].ratings)).not.toBe(-1);
			}
		});
	});
})();