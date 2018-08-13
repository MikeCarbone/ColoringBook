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
  return gulp.src('src/css/*.css')
    .pipe(csso())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./build/css/'));
});

// process js files
gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest('./build/js/'));
});

//refresh the browser when there's changes
gulp.task('serve', ['css', 'js'], function() {
    browserSync.init({
        server: "."
    });
	gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/css/**/*.css', ['css']);
	gulp.watch(['./src/js/*.js','./src/css/*.css']).on('change', browserSync.reload);
});
