var jstConcat = require('gulp-jst-concat');

module.exports = function jstTask(gulp, guilty)
{
	gulp.task(
		guilty.taskName('jst'),
		guilty.taskName([
			'setup'
		]),
		function() {
			var jstStream = gulp.src(guilty.srcPath('**/*.jst'))
				.pipe(jstConcat('jst.js'))
				.pipe(guilty.destJS('js'))
			;
			
			//return jstStream.pipe(gulp.src(guilty.srcPath('**/*.js'), {base: guilty.srcPath()}))
			//	.pipe(guilty.destJS('js'));
		}
	);
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath('**/*.jst'), [guilty.taskName('jst')]);
	});
};