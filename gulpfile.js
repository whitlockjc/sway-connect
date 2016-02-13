/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var $ = require('gulp-load-plugins')({
  rename: {
    'gulp-jsdoc-to-markdown': 'jsdoc2MD'
  }
});
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('clean', function (done) {
  del([
    'coverage'
  ], done);
});

gulp.task('docs', function () {
  return gulp.src('./lib/*.js')
    .pipe($.concat('API.md'))
    .pipe($.jsdoc2MD({'sort-by': ['category', 'name']}))
    .pipe(gulp.dest('docs'));
});

gulp.task('lint', function () {
  return gulp.src([
    'index.js',
    'lib/**/*.js',
    'test/**/*.js',
    'gulpfile.js'
  ])
    .pipe($.eslint())
    .pipe($.eslint.format('stylish'))
    .pipe($.eslint.failAfterError());
});

gulp.task('test', function () {
  gulp.src([
    'index.js',
    'lib/**/*.js'
  ])
    .pipe($.istanbul({includeUntested: true})) // Instrument runtime sources
    .pipe($.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src([
        'test/**/test-*.js',
        '!test/browser/test-*.js'
      ])
        .pipe($.mocha({reporter: 'spec'})) // Run unit tests
        .pipe($.istanbul.writeReports()); // Write coverage report
    });
});

gulp.task('default', function (cb) {
  runSequence('lint', 'test', cb);
});
