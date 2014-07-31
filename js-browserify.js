var source = require('vinyl-source-stream');
var browserify = require('browserify');
var path = require('path');

module.exports = function jsBrowserifyTask(gulp, guilty, filePath)
{
	if (filePath == null) {
		filePath = 'main.js';
	}
	
	gulp.task(
		guilty.taskName('js-browserify'),
		guilty.taskName([
			'setup'
		]),
		function() {
			var bundleStream = browserify({
				entries: './' + filePath,
				basedir: guilty.srcPath()
			}).bundle();
			
			return bundleStream.pipe(source(path.basename(filePath))).pipe(guilty.destJS('js'));
			//return gulp.src(guilty.srcPath('**/*.js'), {base: guilty.srcPath()})
			//	.pipe(guilty.destJS('js'));
		}
	);
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath(filePath), [guilty.taskName('js-browserify')]);
	});
};