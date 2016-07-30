(function() {

	'use strict';

	describe('ListController controller', function() {	

		var listCtrl = 0,$controller,$rootScope,$scope;
				
		beforeEach(module('videoPortal.controllers'));
				
		beforeEach(inject(function($injector) {
			$controller = $injector.get('$controller');
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			listCtrl = $controller('ListController',{$scope: $scope});
			
		}));
		
		it('should be defined',function() {
			expect(listCtrl).toBeDefined();
			expect(typeof listCtrl).not.toBe('number');
		});
		
		it("\'s infiniteScrollArray should be initialized to [4]", function() {
			expect(listCtrl.infiniteScrollArray[0].skip).toBe(4);
			expect(listCtrl.infiniteScrollArray.length).toBe(1);
		});
		
		it("\'s loadMore function should push a 4 into infiniteScrollArray", function() {
			var data = {};
			data.scrollTop = 20;
			listCtrl.loadMore(data);
			expect(listCtrl.infiniteScrollArray[1].skip).toBe(8);
			expect(listCtrl.infiniteScrollArray.length).toBe(2);
			
			data.scrollTop = 40;
			listCtrl.loadMore(data);
			expect(listCtrl.infiniteScrollArray[2].skip).toBe(12);
			expect(listCtrl.infiniteScrollArray.length).toBe(3);
			
			//should not insert
			listCtrl.loadMore(data);
			expect(listCtrl.infiniteScrollArray.length).toBe(3);
		});
		
		it("should call vm.loadMore() when it receives a 'loadMore' broadcast", function() {
			spyOn(listCtrl,'loadMore');
			$rootScope.$broadcast('loadMore',{});
			expect(listCtrl.loadMore).toHaveBeenCalled();			
		});
	});
})();