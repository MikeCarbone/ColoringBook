// include the required packages.
const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

//process css files
gulp.task('css', function () {
  return gulp.src('./css/src/*.css')
    .pipe(csso())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./css/'));
});

//process js files
gulp.task('js', function () {
  return gulp.src('./js/src/*.js')
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js/'));
});

//refresh the browser when there's changes
gulp.task('serve', ['css', 'js'], function() {
    browserSync.init({
        server: "."
    });
	gulp.watch('./js/src/*.js', ['js']);
	gulp.watch('./css/src/*.css', ['css']);
	gulp.watch('./js/*.js','./css/*.css').on('change', browserSync.reload);
});

// Default gulp task to run
gulp.task('default', ['serve']);