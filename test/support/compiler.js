var fs                      = require('fs');
var babel                   = require('babel-core');
var coffeeTransformer       = require('coffee-script/register');
var origJs                  = require.extensions['.js'];

function getContent(path) {
	return fs.readFileSync(path, 'utf8');
}

function transform(path) {
	var content = getContent(path);

	if (path.indexOf('.coffee') > -1) {
		return coffeeTransformer.transform(content);
	}

	return babel.transform(content).code;
}

require.extensions['.js'] = function(module, path) {
	// optimization: code in a distribution should never go through transformers

	if (path.indexOf('node_modules/') >= 0) {
		return (origJs || require.extensions['.js'])(module, path);
	}

	var transformed = transform(path);

	return module._compile(transformed, path);
};