(function() {

	'use strict';

	describe('DetailController controller', function() {	

		var detailCtrl = 0,$controller,$stateParams;
				
		beforeEach(module('videoPortal.controllers'));
		beforeEach(module(function($provide) {			
			$provide.service('$stateParams',function() {
				this.id = 1;
				this.title = 'test';
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
		
		it('should set the id and title properties',function() {
			expect(detailCtrl.id).toBe(1);
			expect(detailCtrl.title).toBe('test');
		});
		
	});
})();