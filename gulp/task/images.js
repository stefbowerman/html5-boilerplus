// ### Images
// `gulp images` - Run lossless compression on all the images.

var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync');
var manifest    = require('asset-builder')('./manifest.json');

var globs       = manifest.globs;
var paths       = manifest.paths;

module.exports = function() {
  return gulp.src(globs.images)
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
      })
    )
    .pipe(
      gulp.dest(paths.dist + 'images')
    )
    .pipe(
      browserSync.stream()
    );
};