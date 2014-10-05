'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var DEST = 'dist/';

gulp.task('default', function() {
	return gulp.src('lib/imm.js')
	// This will output the non-minified version
	.pipe(gulp.dest(DEST))
	// This will minify and rename to foo.min.js
	.pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest(DEST));
});