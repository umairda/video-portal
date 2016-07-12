(function() {
		
	'use strict';

	describe('headController',function() {
		var head=null,page=null;
		beforeEach(module('videoPortal'));
		beforeEach(inject(function($controller,Page) {
			head=$controller('HeadController', {
				Page:Page,
			});
			page=Page;
		}));
		
		it('sets the title',function() {
			expect(page.title()).toBe('Video Portal');		
		});
	});
})();