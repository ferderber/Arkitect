var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');

gulp.task('start', function() {
    nodemon({
        script: 'index.js',
        ext: 'js'
    });
});
gulp.task('browser', function() {
    browserSync.init({
        proxy: 'localhost:3000',
        port: 3001
    });
    gulp.watch(['public/**/*.html', 'public/**/*.css', '!public/bower_components'], browserSync.reload);
});

gulp.task('lint', function() {
    return gulp.src(['routes/**/*.js', 'models/**/*.js', '*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});
gulp.task('default', ['start']);
