var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

module.exports = function coffeeTask(gulp, guilty)
{
	gulp.task(
		guilty.taskName('coffee'),
		[
			guilty.taskName('setup')
			//guilty.taskName('admin-coffee')
		],
		function() {
			return gulp.src(guilty.srcPath('main.coffee'), {read: false})
				.pipe(plumber({
					errorHandler: function(error) {
						console.log(error.message);
				
						notify.onError(function (error) {
					        return "Message to the notifier: " + error.message;
						})(error);
					}
				}))
				.pipe(browserify({
					transform: ['coffeeify'],
					extensions: ['.coffee']
				}))
				.pipe(rename('main.js'))
				.pipe(guilty.destJS('/'))
				//.pipe(gulp.dest(baseDestFolder + 'js/main'))
			;
		}
	);
};