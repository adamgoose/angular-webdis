var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('app-angular', function()
{
  return gulp.src('angular-webdis.js')
    .pipe(ngAnnotate({
      single_quotes: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({
      preserveComments: 'all'
    }))
    .pipe(rename({extname: ".min.js"}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['app-angular']);