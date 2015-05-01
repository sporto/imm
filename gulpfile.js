'use strict';

var gulp    = require('gulp');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var markdox = require("gulp-markdox");
var jscs    = require('gulp-jscs');
var stylish = require('jshint-stylish');
var mocha   = require('gulp-mocha');
var header  = require('gulp-header');
var run     = require('gulp-run');
var webpack = require('gulp-webpack-build');
var path    = require('path');

require('babel/register');

var DEST = 'dist/';

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jscs());
});

gulp.task('test', function () {
	var mochaOptions = {
		reporter: 'nyan',
		// compilers: '.:test/support/compiler.js'
	}
	return gulp.src("./test/**/*.coffee", {read: false})
		.pipe(mocha(mochaOptions));
});

gulp.task('test-watch', function() {
	gulp.watch(['src/**', 'test/**'], ['test']);
});

gulp.task('bundle', function() {
	return gulp.src('webpack.config.js')
		.pipe(webpack.compile())
		.pipe(gulp.dest('./'));
});

gulp.task('min', ['bundle'], function() {
	return gulp.src('dist/imm.js')
		.pipe(uglify({preserveComments: 'some'}))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest(DEST));
});

gulp.task('doc', function () {
	run('verb').exec();
})

gulp.task('default', ['test', 'lint', 'min', 'doc']);