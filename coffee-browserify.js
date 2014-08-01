var coffeeify = require('coffeeify');
var _ = require('underscore');

module.exports = function coffeeBrowserifyTask(gulp, guilty, options)
{
	options = _.extend({
		taskName: 'coffee-browserify',
		srcFilePath: 'main.coffee',
		destFilePath: 'main.js',
		browserifySetUpCallback: function(browserifyInstance) {
			browserifyInstance.transform(coffeeify);
		},
		browserifyOptions: {
			//transform: ['coffeeify'],
			extensions: ['.coffee']
		}
	}, options);
	
	return guilty.requireTask('js-browserify', options)
};