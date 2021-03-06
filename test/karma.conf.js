module.exports = function(config){
	config.set({
		basePath : '../',
		files : [
			'src/bower_components/jquery/dist/jquery.js',
			'src/bower_components/angular/angular.js',
			'src/bower_components/angular-route/angular-route.js',
			'src/bower_components/angular-mocks/angular-mocks.js',
			'src/bower_components/seiyria-bootstrap-slider/js/bootstrap-slider.js',
			'src/js/**/*.js',
			'test/unit/**/*.js'
		],
		autoWatch : true,
		frameworks: ['jasmine'],
		browsers : ['Chrome'],
		plugins : [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],
		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
};
