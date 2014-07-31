var copyTask = require('./copy');

module.exports = function htmlTask(gulp, guilty)
{
	return copyTask(gulp, guilty, 'html', '**/*.html');
}