var jstConcat = require('gulp-jst-concat');

module.exports = function javaScriptTask(gulp, guilty)
{
	gulp.task(
		guilty.taskName('js'),
		guilty.taskName([
			'setup'
		]),
		function() {
			return gulp.src(guilty.srcPath('**/*.js'), {base: guilty.srcPath()})
				.pipe(guilty.destJS('js'));
		}
	);
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath('**/*.js'), [guilty.taskName('js')]);
	});
};