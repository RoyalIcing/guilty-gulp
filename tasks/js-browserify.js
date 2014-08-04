var source = require('vinyl-source-stream');
var browserify = require('browserify');
var path = require('path');
var _ = require('underscore');

module.exports = function jsBrowserifyTask(gulp, guilty, options)
{
	options = _.extend({
		taskName: 'js-browserify',
		srcFilePath: 'main.js',
		destFilePath: 'main.js',
		browserifySetUpCallback: function(browserifyInstance) {},
		browserifyOptions: {}
	}, options);
	
	var taskName = options.taskName;
	var srcFilePath = options.srcFilePath;
	var destFilePath = options.destFilePath;
	
	var browserifySetUpCallback = options.browserifySetUpCallback;
	var browserifyOptions = _.extend({
		entries: './' + srcFilePath,
		basedir: guilty.srcPath()
	}, options.browserifyOptions);
	
	
	gulp.task(
		guilty.taskName(taskName),
		guilty.defaultTaskDependencies(),
		function() {
			var browserifyInstance = browserify(browserifyOptions);
			
			if (browserifySetUpCallback) {
				browserifySetUpCallback.call(null, browserifyInstance);
			}
			
			var bundleStream = browserifyInstance.bundle();
			
			return bundleStream
				.pipe(source(path.basename(destFilePath)))
				.pipe(guilty.destJS(path.dirname(destFilePath)))
			;
		}
	);
	
	guilty.addWatch(function() {
		gulp.watch(guilty.srcPath(srcFilePath), [guilty.taskName(taskName)]);
	});
};