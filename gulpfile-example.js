var gulp = require('gulp');
gulp.on('err', function(e) {
	console.log(e.err.stack);
});

///////////////////////////////////////////////////////////////////

var guilty = require('./gulp-guilty/index')({
	taskNameGroup: 'main'
});

require('./gulp-guilty/images')(gulp, guilty);
require('./gulp-guilty/compass')(gulp, guilty, {srcFilePath: 'main.scss', destCSSPath: './'});
//require('./gulp-guilty/coffee-browserify')(gulp, guilty);
//require('./gulp-guilty/js')(gulp, guilty);
require('./gulp-guilty/js-browserify')(gulp, guilty, {srcFilePath: 'main.js'});
require('./gulp-guilty/jst')(gulp, guilty);
require('./gulp-guilty/copy')(gulp, guilty, {taskName: 'vendor-js', srcGlobPath: 'vendor-js/porthole.min.js'});
require('./gulp-guilty/html')(gulp, guilty);


// Main
gulp.task(
	guilty.taskNameGroup,
	guilty.taskName([
		//'clean',
		'images',
		'compass',
		//'coffee-browserify',
		'js-browserify',
		'jst',
		'vendor-js',
		'html'
		//'js'
	])
);


gulp.task(
	'default',
	[
		guilty.taskNameGroup
	]
);


gulp.task(
	'watch',
	[
		guilty.taskNameGroup,
		guilty.taskName('watch')
	]
);
