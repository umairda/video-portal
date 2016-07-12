(function() {

	'use strict';

	describe('ListController controller', function() {	

		var listCtrl = 0,$controller;
				
		beforeEach(module('videoPortal.controllers'));
				
		beforeEach(inject(function($injector) {
			$controller = $injector.get('$controller');
			listCtrl = $controller('ListController');
			
		}));
		
		it('should be defined',function() {
			expect(listCtrl).toBeDefined();
			expect(typeof listCtrl).not.toBe('number');
		});
		
		it("\'s infiniteScrollArray should be initialized to [0]", function() {
			expect(listCtrl.infiniteScrollArray[0]).toBe(0);
			expect(listCtrl.infiniteScrollArray.length).toBe(1);
		});
		
		it("\'s loadMore function should push a 4 into infiniteScrollArray", function() {
			listCtrl.loadMore();
			expect(listCtrl.infiniteScrollArray[1]).toBe(4);
			expect(listCtrl.infiniteScrollArray.length).toBe(2);
			
			listCtrl.loadMore();
			expect(listCtrl.infiniteScrollArray[2]).toBe(8);
			expect(listCtrl.infiniteScrollArray.length).toBe(3);
		});
	});
})();