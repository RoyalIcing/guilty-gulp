var compass = require('gulp-compass');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

module.exports = function compassTask(gulp, guilty, filePath, destPath)
{
	if (filePath == null) {
		filePath = 'main.scss';
	}
	
	if (destPath == null) {
		destPath = 'css/';
	}
	
	gulp.task(guilty.taskName('compass'),
		[
			guilty.taskName('setup'),
			guilty.taskName('images')
		],
		function() {
			return gulp.src(guilty.srcPath(filePath))
				.pipe(plumber({
					errorHandler: function(error) {
						console.log(error.message);
			
						/*notify.onError(function (error) {
					        return "Message to the notifier: " + error.message;
						})(error);*/
					}
				}))
				.pipe(compass({
					//config_file: './config.rb',
					sass: guilty.srcPath(),
					css: guilty.destPath(destPath),
					image: guilty.destPath('images'),
					javascript: guilty.destPath('js'),
					font: guilty.destPath('font')
				}))
				.pipe(prefix('last 2 version', '> 1%', 'ie 8'))
				.pipe(guilty.destCSS(destPath))
			;
		}
	);
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath('**/*.scss'), [guilty.taskName('compass')]);
	});
};