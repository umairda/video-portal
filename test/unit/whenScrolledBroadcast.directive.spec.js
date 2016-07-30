(function() {
	'use strict';
	
	describe('whenScrolledBroadcast directive', function() {
		
		var element;
		var $document,rootScope,$scope;
		
		beforeEach(module('videoPortal'));
		beforeEach(module('my.templates'));
		beforeEach(inject(function($compile,_$document_,$rootScope) {
			$document = _$document_;
			$scope = $rootScope.$new();
			rootScope = $rootScope;
			
			element = angular.element('<body when-scrolled-broadcast="loadMore">body text</body>');
			element = $compile(element)($scope);
			$scope.$apply();
			console.log('element',element);
		}));
		
		xit('should call vm.scrollHandler on a $document scroll event',function() {
			spyOn(rootScope,'$broadcast');
			$document.triggerHandler('scroll');
			$scope.$apply();
			expect(rootScope.$broadcast).toHaveBeenCalledWith('loadMore');
		});	
	});
})();