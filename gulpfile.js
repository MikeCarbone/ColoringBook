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
  return gulp.src('./src/css/*.css')
    .pipe(csso())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./build/css/'));
});

// process js files
gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build/'))

});

gulp.task('copy_assets', function() {
    return gulp.src('./src/assets/*')
    .pipe(gulp.dest('./build/assets/'))
});

//refresh the browser when there's changes
gulp.task('serve', ['css', 'js', 'html', 'copy_assets'], function() {
    browserSync.init({
        server: "./build/"
    });
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch(['./src/js/*.js','./src/css/*.css', './src/index.html']).on('change', browserSync.reload);
});