var jst = require('gulp-jst');

module.exports = function jstTask(gulp, guilty)
{
	gulp.task(
		guilty.taskName('jst'),
		[
			guilty.taskName('setup')
		],
		function() {
			return gulp.src(guilty.srcPath('**/*.jst'))
				.pipe(jst())
				.pipe(guilty.dest('templates'))
			;
		}
	);
};