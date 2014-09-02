'use strict';

/**
 * Slider input for Twitter Bootstrap based on Kyle Kemp's fork
 * (https://github.com/seiyria/bootstrap-slider) of the original
 * Bootstrap Slider by Stefan Petre (http://www.eyecon.ro).
 * 
 * Usage:
 *
 *   <input type="hidden"
 *   	data-bootstrap-slider
 *   	[data-min="1"]
 *   	[data-max="5"]
 *   	[data-step="1"]
 *   	[data-range-slider]
 *   	[data-tooltip="show|hide|always"]
 *   	[data-split-tooltip]
 *   	[data-tooltip-formatter="callbackFn(value)"]
 *   	[data-ng-disabled="disabledVal"]
 *   	name="inputName">
 *
 */
angular.module('ng').directive("bootstrapSlider", ["$parse", function($parse){
	return {
		restrict: "A",
		require: "?ngModel",
		link: function(scope, element, attrs, ngModel){
			// Min value
			var min = 0;
			if (angular.isDefined(attrs.min)){
				min = parseInt(attrs.min);
			}
			
			// Max value
			var max = 10;
			if (angular.isDefined(attrs.max)){
				max = parseInt(attrs.max);
			}
			
			// Step
			var step = 1;
			if (angular.isDefined(attrs.step)){
				step = parseInt(attrs.step);
			}
			
			// Is a range?
			var range = angular.isDefined(attrs.range);
			
			// Initial value
			var value = range?[min, max]:min;
			
			// Tooltip mode
			var tooltipMode = 'show';
			if (angular.isDefined(attrs.tooltip)){
				tooltipMode = attrs.tooltip;
			}
			
			// Attach slider
			element.slider({
				min: min,
				max: max,
				step: step,
				range: range,
				value: value,
				tooltip: tooltipMode,
				tooltip_split: angular.isDefined(attrs.splitTooltip)
			});
			
			// Custom formatter
			if (angular.isDefined(attrs.tooltipFormatter)){
				var formatter = $parse(attrs.tooltipFormatter);
				element.slider('setAttribute', 'formater', function(value){
					return formatter(scope, {value: value});
				});
			}
			
			if (ngModel && angular.isDefined(attrs.ngModel)){
				element.bind('slide', function(e){
					var setValue = function(){
						ngModel.$setViewValue(e.value);
					};
					if(!scope.$$phase){
						scope.$apply(setValue);
					}
					else setValue();
				});
				
				ngModel.$render = function(){
					if (!ngModel.$isEmpty(ngModel.$viewValue)){
						element.slider('setValue', ngModel.$viewValue, false);
					}
				};
			}
			
			// Enabled/disable
			scope.$watch(attrs.ngDisabled, function(disabled){
				element.slider(disabled?'disable':'enable');
			});
		}
	};
}]);
