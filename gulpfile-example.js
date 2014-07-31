var gulp = require('gulp');
gulp.on('err', function(e) {
	console.log(e.err.stack);
});

///////////////////////////////////////////////////////////////////

var guilty = require('./gulp-guilty/index')({
	taskNameGroup: 'main'
});

require('./gulp-guilty/images')(gulp, guilty);
require('./gulp-guilty/compass')(gulp, guilty, 'main.scss', './');
//require('./gulp-guilty/coffee')(gulp, guilty);
//require('./gulp-guilty/js')(gulp, guilty);
require('./gulp-guilty/js-browserify')(gulp, guilty, 'main.js');
require('./gulp-guilty/jst')(gulp, guilty);
require('./gulp-guilty/copy')(gulp, guilty, 'vendor-js', 'vendor-js/porthole.min.js');
require('./gulp-guilty/html')(gulp, guilty);


// Main
gulp.task(
	guilty.taskNameGroup,
	guilty.taskName([
		//'clean',
		'images',
		'compass',
		//'coffee',
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
