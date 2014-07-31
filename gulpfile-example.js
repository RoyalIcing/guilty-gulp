var gulp = require('gulp');
gulp.on('err', function(e) {
	console.log(e.err.stack);
});

///////////////////////////////////////////////////////////////////

var guilty = require('./gulp-guilty/index')({
	taskNameGroup: 'main'
});

require('./gulp-guilty/images')(gulp, guilty);
require('./gulp-guilty/compass')(gulp, guilty);
//require('./gulp-guilty/coffee')(gulp, guilty);
require('./gulp-guilty/js')(gulp, guilty);
require('./gulp-guilty/jst')(gulp, guilty);


// Main
gulp.task(
	guilty.taskNameGroup,
	guilty.taskName([
		//'clean',
		'images',
		'compass',
		//'coffee',
		'js',
		'jst',
		'html'
		//'js'
	])
);


gulp.task(guilty.taskName('watch'), function() {
	// SASS
	gulp.watch(guilty.srcPath('**/*.scss'), [guilty.taskName('compass')]);
	
	// JAVASCRIPT and COFFEE
	gulp.watch(guilty.srcPath('**/*.js'), [guilty.taskName('js')]);
	gulp.watch(guilty.srcPath('**/*.jst'), [guilty.taskName('jst')]);
	gulp.watch(guilty.srcPath('**/*.coffee'), [guilty.taskName('coffee')]);
	
	// HTML
	gulp.watch(guilty.srcPath('**/*.html'), [guilty.taskName('html')]);
});


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
