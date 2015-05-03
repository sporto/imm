'use strict';

var gulp    = require('gulp');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var jscs    = require('gulp-jscs');
var stylish = require('jshint-stylish');
var mocha   = require('gulp-mocha');
var header  = require('gulp-header');
var run     = require('gulp-run');
var concat  = require('gulp-concat');
var webpack = require('gulp-webpack-build');
var path    = require('path');
var markdox = require('gulp-markdox');

// register verb helpers
// verb.helper('apidocs', verbApiDocs);

require('babel/register');

var DEST = 'dist/';

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jscs());
});

gulp.task('test', function() {
	var mochaOptions = {
		reporter: 'nyan'
	}
	return gulp.src('./test/**/*.coffee', {read: false})
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
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest(DEST));
});

// this doesnt work as expected
gulp.task('doc-imm', function() {
	gulp.src('./src/*.js')
		.pipe(markdox())
		.pipe(concat('imm.md'))
		.pipe(gulp.dest('./tmp/doc'));
});

// gulp.task('api-doc-list', function() {
// 	gulp.src('./src/*.js')
// 		.pipe(markdox())
// 		.pipe(concat('api-list.md'))
// 		.pipe(gulp.dest('./tmp/doc'));
// });

// gulp.task('api-doc', ['api-doc-main', 'api-doc-list'], function() {
// 	gulp.src('./tmp/doc/*.md')
// 		.pipe(concat('api.md'))
// 		.pipe(gulp.dest('./tmp/doc2'));
// });

gulp.task('doc', function() {
	// var args = {
	// 	helpers: [verbApiDocs],
	// 	dest:   'readme.md'
	// };
	// gulp.src(['.verbrc.md'])
	// 	// dest filename is defined in options,
	// 	// otherwise gulp will overwrite .verbrc.md
	// 	.pipe(verbG(args))
	// 	.pipe(gulp.dest('./'));

		// verb.src(['.verb*.md', 'docs/_verb/**/*.md'])
		// .on('error', gutil.log)
		// .pipe(verb.dest('./'));
});

gulp.task('default', ['test', 'lint', 'min', 'doc']);
