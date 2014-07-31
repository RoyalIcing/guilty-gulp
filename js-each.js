module.exports = function jsEachTask(gulp, guilty, srcPathGlob, destPath)
{
	if (srcPathGlob == null) {
		srcPathGlob = '**/*.js';
	}
	
	if (destPath == null) {
		destPath = 'js';
	}
	
	gulp.task(
		guilty.taskName('js-each'),
		guilty.taskName([
			'setup'
		]),
		function() {
			return gulp.src(guilty.srcPath(srcPathGlob), {base: guilty.srcPath()})
				.pipe(guilty.destJS(destPath));
		}
	);
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath(srcPathGlob), [guilty.taskName('js-each')]);
	});
};