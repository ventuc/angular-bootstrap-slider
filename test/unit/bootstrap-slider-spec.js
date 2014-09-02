'use strict';

/* Jasmine tests */
describe('Bootstrap slider directive', function(){
	
	var compile, rootScope = null;
	
	beforeEach(function(){
		inject(function($compile, $rootScope){
			compile = $compile;
			rootScope = $rootScope;
		});
	});
	
	it('should attach a slider with default values', function(){
		var element = compile('<input type="hidden" data-bootstrap-slider>')(rootScope);
		
		expect(element.slider('isEnabled')).toBe(true);
		expect(element.slider('getValue')).toBe(0);
		
		expect(element.slider('getAttribute', 'min')).toBe(0);
		expect(element.slider('getAttribute', 'max')).toBe(10);
		expect(element.slider('getAttribute', 'step')).toBe(1);
		expect(element.slider('getAttribute', 'range')).toBe(false);
		expect(element.slider('getAttribute', 'tooltip')).toBe('show');
		expect(element.slider('getAttribute', 'tooltip_split')).toBe(false);
	});
	
});
