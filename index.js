var gulputil = require('gulp-util');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var lazypipe = require('lazypipe');
var clean = require('gulp-clean');
var _ = require('underscore');


// Use by adding --production to gulp command
var isProduction = !!(gulputil.env.production);
// Use by adding --clean to gulp command
var shouldClean = !!(gulputil.env.clean) || isProduction;


var srcPath = function(filePath)
{
	if (filePath == null) {
		return filePath = '';
	}
	
	return path.join(this.baseSrcFolder, filePath);
}

var destPath = function(filePath)
{
	if (filePath == null) {
		filePath = '';
	}
	
	return path.join(this.baseDestFolder, filePath);
}

var dest = function(filePath)
{
	var stream = lazypipe();
	
	var destFilePath = this.destPath(filePath);
	stream = stream.pipe(gulp.dest, destFilePath);
	
	return stream();
}

var destCSS = function(filePath)
{
	var stream = lazypipe();
	
	if (isProduction) {
		stream = stream.pipe(minifyCSS);
	}
	
	stream = stream.pipe(assetsDest, filePath);
	
	return stream();
}

var destJS = function(filePath)
{
	// Todo: Skip the minifying of files with '.min' in the name.
	
	var stream = lazypipe();
	
	if (isProduction) {
		stream = stream.pipe(uglify);
	}
	
	stream = stream.pipe(assetsDest, filePath);
	
	return stream();
}


var taskName = function(inputTaskNameOrNames)
{
	var taskNameGroup = this.taskNameGroup;
	var fullTaskName = function(taskName) {
		return taskNameGroup + '-' + taskName;
	};
	
	var taskNames;
	if (typeof inputTaskNameOrNames === 'string') {
		var taskName = inputTaskNameOrNames;
		return fullTaskName(taskName);
	}
	// Array of task name strings.
	else {
		var taskNames = inputTaskNameOrNames;
		return _.map(taskNames, fullTaskName);
	}
}

var setUpBaseTasks = function()
{
	var destPath = this.destPath();
	
	gulp.task(this.taskName('clean'), function() {
		return gulp.src(destPath, {read: false})
			.pipe(clean())
		;
	});

	gulp.task(this.taskName('setup'), shouldClean ? [this.taskName('clean')] : [], function(cb) {
		cb();
	});
}



var baseSrcFolder = './src/'
var baseDestFolder = isProduction ? './prod/' : './dev/';

module.exports = function(options) {
	var newInstance = {
		taskNameGroup: options.taskNameGroup,
		isProduction: isProduction,
		shouldClean: shouldClean,
		baseSrcFolder: options.baseSrcFolder ? options.baseSrcFolder : baseSrcFolder,
		baseDestFolder: options.baseDestFolder ? options.baseDestFolder : baseDestFolder,
		srcPath: srcPath,
		destPath: destPath,
		dest: dest,
		destCSS: destCSS,
		destJS: destJS,
		taskName: taskName,
		setUpBaseTasks: setUpBaseTasks
	};
	
	newInstance.setUpBaseTasks();
	
	return newInstance;
};