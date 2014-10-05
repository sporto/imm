'use strict';

var gulp    = require('gulp');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var markdox = require("gulp-markdox");
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha   = require('gulp-mocha');
var header  = require('gulp-header');

var DEST = 'dist/';

gulp.task('lint', function() {
	return gulp.src('./src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('test', function () {
	return gulp.src("./test/*.js", {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('min', function() {
	return gulp.src('src/imm.js')
	// This will output the non-minified version
	.pipe(gulp.dest(DEST))
	// This will minify and rename to foo.min.js
	.pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest(DEST));
});

gulp.task("doc", function(){
	gulp.src("./src/*.js")
		.pipe(markdox())
		.pipe(rename({ extname: '.md' }))
		.pipe(gulp.dest("./doc"));
});

gulp.task('default', ['test', 'lint', 'min', 'doc']);