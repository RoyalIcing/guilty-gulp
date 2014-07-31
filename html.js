module.exports = function compassTask(gulp, guilty)
{
	gulp.task(
		guilty.taskName('html'),
		[
			guilty.taskName('setup')
		],
		function() {
			return gulp.src(guilty.srcPath('*.html'), {base: guilty.srcPath('')})
				.pipe(guilty.dest());
	});
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath('**/*.html'), [guilty.taskName('html')]);
	});
}