var babel                   = require('babel-core');

exports.handlers = {
	beforeParse: function(e) {
		var transformed = babel.transform(e.source).code;
		e.source = transformed;
	}
};
