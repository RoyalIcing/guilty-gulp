var gulp = require('gulp');


var taskNameGroup = 'main';

var guilty = require('./gulp-guilty/index')({
	taskNameGroup: taskNameGroup
});

require('./gulp-guilty/images')(gulp, guilty);
require('./gulp-guilty/compass')(gulp, guilty);
require('./gulp-guilty/coffee')(gulp, guilty);
require('./gulp-guilty/js')(gulp, guilty);


// Main
gulp.task(
	taskNameGroup,
	guilty.taskName([
		'clean',
		'images',
		'compass',
		'coffee'
	])
);

// Watch
gulp.task(guilty.taskName('watch'), function() {
	// SASS
	gulp.watch('./src/**/*.scss', [taskNameGroup]);
	//gulp.watch('./sass/admin/*.scss', ['admin-compass']);
	
	// COFFEE
	gulp.watch('./src/**/*.coffee', [taskNameGroup]);
	//gulp.watch('./src/**/*.js', [taskNameGroup]);
});

// Default
gulp.task(
	'default',
	[
		taskNameGroup,
		guilty.taskName('watch')
	]
);
