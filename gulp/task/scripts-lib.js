var gulp        = require('gulp');
var browserSync = require('browser-sync');
var uglify      = require('gulp-uglify');
var manifest    = require('asset-builder')('./manifest.json');
var paths       = manifest.paths;

module.exports = function(){
  return gulp.src([
    paths.source + '/js/lib/**/*'
  ])
  .pipe(uglify())
  .pipe(
    gulp.dest(paths.dist + '/js/lib/')
  )
  .pipe(
    browserSync.stream()
  );
}