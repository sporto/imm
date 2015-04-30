'use strict';

var gulp    = require('gulp');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var markdox = require("gulp-markdox");
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha   = require('gulp-mocha');
var header  = require('gulp-header');
var run     = require('gulp-run');
var webpack = require('gulp-webpack-build');
var path    = require('path');

var DEST = 'dist/';

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('test', function () {
	return gulp.src("./test/**/*.js", {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test-watch', function() {
    gulp.watch(['src/**', 'test/**'], ['test']);
});

gulp.task("webpack", function() {
	return gulp.src('webpack.config.js')
		.pipe(webpack.compile())
		.pipe(gulp.dest('./'));
});

gulp.task('min', ['webpack'], function() {
	return gulp.src('dist/imm.js')
		.pipe(uglify({preserveComments: 'some'}))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest(DEST));
});

gulp.task('doc', function () {
  run('verb').exec();
})

gulp.task('default', ['test', 'lint', 'min', 'doc']);