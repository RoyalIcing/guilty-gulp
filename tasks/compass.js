var compass = require('gulp-compass');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var _ = require('underscore');

module.exports = function compassTask(gulp, guilty, options)
{
	options = _.extend({
		taskName: 'compass',
		srcFilePath: 'main.scss',
		watchSrcFileGlob: '**/*.scss',
		destCSSPath: 'css/',
		compassOptions: {}
	}, options);
	
	var taskName = options.taskName;
	
	var srcFilePath = options.srcFilePath;
	var destCSSPath = options.destCSSPath;
	var watchSrcFileGlob = options.watchSrcFileGlob;
	
	var compassOptions = _.extend({
		//config_file: './config.rb',
		sass: guilty.srcPath(),
		css: guilty.destPath(destCSSPath),
		image: guilty.destPath('images'),
		javascript: guilty.destPath('js'),
		font: guilty.destPath('font')
	}, compassOptions);
	
	gulp.task(guilty.taskName('compass'),
		[
			guilty.taskName('setup'),
			guilty.taskName('images')
		],
		function() {
			return gulp.src(guilty.srcPath(srcFilePath))
				.pipe(plumber({
					errorHandler: function(error) {
						console.log(error.message);
			
						/*notify.onError(function (error) {
					        return "Message to the notifier: " + error.message;
						})(error);*/
					}
				}))
				.pipe(compass(compassOptions))
				.pipe(prefix('last 2 version', '> 1%', 'ie 8'))
				.pipe(guilty.destCSS(destCSSPath))
			;
		}
	);
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath(watchSrcFileGlob), [guilty.taskName('compass')]);
	});
};