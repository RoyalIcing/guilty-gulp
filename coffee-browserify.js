var coffee = require('gulp-coffee');
var coffeeify = require('coffeeify');
var jsBrowserifyTask = require('./js-browserify');
var _ = require('underscore');

//var browserify = require('gulp-browserify');
//var rename = require('gulp-rename');
//var plumber = require('gulp-plumber');

module.exports = function coffeeBrowserifyTask(gulp, guilty, options)
{
	options = _.extend({
		taskName: 'coffee-browserify',
		srcFilePath: 'main.coffee',
		destFilePath: 'main.js',
		browserifyOptions: {
			transform: ['coffeeify'],
			extensions: ['.coffee']
		}
	}, options);
	
	return jsBrowserifyTask(gulp, guilty, options);
};