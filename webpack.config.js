var path = require('path');
var webpack = require('webpack');

var ignoreP = new webpack.IgnorePlugin(/seamless-immutable/)

module.exports = {
	context: __dirname,
	entry: {
		imm: './src/imm.js'
	},
	output: {
		path: __dirname + "/dist",
		filename:      '[name].js',
		libraryTarget: 'umd'
	},
	externals: [
		// Every non-relative module is external
		/^[a-z\-0-9]+$/,
	],
	module: {
		loaders: []
	},
	resolve: {
		alias: {
		}
	},
	plugins: []
};
