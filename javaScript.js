modules.export = function javaScript(gulp, guilty)
{
	gulp.task(
		guilty.taskName('js'),
		guilty.taskName([
			'setup',
			'coffee'
		]),
		function() {
			return gulp.src(guilty.srcPath('**/*.js'), {base: guilty.srcPath()})
				.pipe(destJS('js'));
		}
	);
};