// include the required packages.
const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const csso = require('gulp-csso');


// Default gulp task to run
gulp.task('default', ['serve']);

//process css files
gulp.task('css', function () {
  return gulp.src('css/src/*.css')
    .pipe(csso())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./css/'));
});

// process js files
gulp.task('js', function () {
  return gulp.src('js/src/*.js')
    .pipe(minify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js/'));
});

//refresh the browser when there's changes
gulp.task('serve', ['css'], function() {
    browserSync.init({
        server: "."
    });
	gulp.watch('js/src/*.js', ['js']);
	gulp.watch('css/src/*.css', ['css']);
	gulp.watch('js/*.js','css/*.css').on('change', browserSync.reload);
});
