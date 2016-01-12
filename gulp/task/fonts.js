// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var flatten     = require('gulp-flatten');
var manifest    = require('asset-builder')('./manifest.json');

var globs       = manifest.globs;
var paths       = manifest.paths; 

module.exports = function(){

  return gulp.src(globs.fonts)
    .pipe(flatten())
    .pipe(gulp.dest(paths.dist + 'fonts'))
    .pipe(browserSync.stream());

}