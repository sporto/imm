'use strict';

var concat   = require('gulp-concat');
var data     = require('gulp-data');
var fs       = require('fs');
var gulp     = require('gulp');
var header   = require('gulp-header');
var jscs     = require('gulp-jscs');
var markdox  = require('gulp-markdox');
var mocha    = require('gulp-mocha');
var path     = require('path');
var rename   = require('gulp-rename');
var run      = require('gulp-run');
var template = require('gulp-template');
var uglify   = require('gulp-uglify');
var webpack  = require('gulp-webpack-build');

require('babel/register');
require('coffee-script/register');

var DEST = 'dist/';
var TEMP = './tmp/';
var TEMPLATES = './templates/';

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jscs());
});

gulp.task('test', function() {
	var mochaOptions = {
		reporter: 'nyan'
	}
	return gulp.src('./test/**/*_spec.*', {read: false})
		.pipe(mocha(mochaOptions));
});

gulp.task('test-watch', function() {
	gulp.watch(['src/**', 'test/**'], ['test']);
});

gulp.task('bundle', function() {
	var banner = fs.readFileSync(TEMPLATES + 'banner.js', 'utf8');
	return gulp.src('webpack.config.js')
		.pipe(webpack.compile())
		.pipe(header(banner))
		.pipe(gulp.dest('./'));
});

gulp.task('min', ['bundle'], function() {
	var banner = fs.readFileSync(TEMPLATES + 'banner.js', 'utf8');
	return gulp.src('dist/imm.js')
		.pipe(uglify({preserveComments: false}))
		.pipe(rename({extname: '.min.js'}))
		.pipe(header(banner))
		.pipe(gulp.dest(DEST));
});

// this doesnt work as expected
gulp.task('doc-imm', function() {
	gulp.src('./src/*.js')
		.pipe(markdox())
		.pipe(concat('doc-imm.md'))
		.pipe(gulp.dest(TEMP));
});

gulp.task('doc-list', function() {
	gulp.src('./src/list/*.js')
		.pipe(markdox())
		.pipe(concat('doc-list.md'))
		.pipe(gulp.dest(TEMP));
});

gulp.task('doc', ['doc-imm', 'doc-list'], function() {
	var docImm     = fs.readFileSync(TEMP + 'doc-imm.md', 'utf8');
	var docImmList = fs.readFileSync(TEMP + 'doc-list.md', 'utf8');

	return gulp.src('./templates/api.md')
		.pipe(data(function() {
			return {
				docImm: docImm,
				docImmList: docImmList
			};
		}))
		.pipe(template())
		.pipe(gulp.dest('./docs'));
});

gulp.task('default', ['test', 'lint', 'min', 'doc']);

