(function() {

	'use strict';

	describe('DetailController controller', function() {	

		var detailCtrl = 0,$controller,$stateParams;
				
		beforeEach(module('videoPortal.controllers'));
		beforeEach(module(function($provide) {			
			$provide.service('$stateParams',function() {
				
			});
			
		}));
		beforeEach(inject(function($injector) {
			$controller = $injector.get('$controller');
			detailCtrl = $controller('DetailController');
			
		}));
		
		it('should be defined',function() {
			expect(detailCtrl).toBeDefined();
			expect(typeof detailCtrl).not.toBe('number');
		});
		
	});
})();