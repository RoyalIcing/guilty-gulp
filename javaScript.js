module.exports = function javaScriptTask(gulp, guilty)
{
	gulp.task(
		guilty.taskName('javaScript'),
		guilty.taskName([
			'setup'
			//'coffee'
		]),
		function() {
			return gulp.src(guilty.srcPath('**/*.js'), {base: guilty.srcPath()})
				.pipe(guilty.destJS('js'));
		}
	);
};