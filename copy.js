module.exports = function copyTask(gulp, guilty, taskName, pathGlob)
{
	gulp.task(
		guilty.taskName(taskName),
		[
			guilty.taskName('setup')
		],
		function() {
			return gulp.src(guilty.srcPath(pathGlob), {base: guilty.srcPath('')})
				.pipe(guilty.dest());
	});
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath(pathGlob), [guilty.taskName(taskName)]);
	});
}