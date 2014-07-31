var svgmin = require('gulp-svgmin');

module.exports = function imagesTask(gulp, guilty)
{
	// SVG Optimization
	gulp.task(
		guilty.taskName('images-svgo'),
		[
			guilty.taskName('setup')
		],
		function() {
			return gulp.src(guilty.srcPath('**/*.svg'))
				.pipe(svgmin())
				.pipe(guilty.dest('images'))
			;
		}
	);

	// Images
	gulp.task(
		guilty.taskName('images'),
		[
			guilty.taskName('setup'),
			guilty.taskName('images-svgo')
		],
		function() {
			return gulp.src(guilty.srcPath('images/**'), {base: guilty.srcPath('images')})
				.pipe(guilty.dest('images'));
	});
};