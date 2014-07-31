var compass = require('gulp-compass');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

modules.export = function compass(gulp, guilty)
{
	gulp.task(guilty.taskName('compass'),
		[
			guilty.taskName('setup'),
			guilty.taskName('images')
		],
		function() {
			return gulp.src('./src/main.scss')
				.pipe(plumber({
					errorHandler: function(error) {
						console.log(error.message);
			
						notify.onError(function (error) {
					        return "Message to the notifier: " + error.message;
						})(error);
					}
				}))
				.pipe(compass({
					//config_file: './config.rb',
					sass: './src',
					css: getAssetsPath('css'),
					image: getAssetsPath('images'),
					javascript: getAssetsPath('js'),
					font: getAssetsPath('font')
				}))
				.pipe(prefix('last 2 version', '> 1%', 'ie 8'))
				.pipe(guilty.destCSS('/'))
				//.pipe(gulp.dest(baseDestFolder + 'css/main/'))
			;
		}
	);
};