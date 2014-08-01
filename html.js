var copyTask = require('./copy');
var _ = require('underscore');

module.exports = function htmlTask(gulp, guilty, options)
{
	options = _.extend({
		taskName: 'html',
		srcPathGlob: '**/*.html',
		destPath: ''
	}, options);
	
	return copyTask(gulp, guilty, options);
}