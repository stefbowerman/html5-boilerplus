var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserify  = require('browserify');
var babelify    = require('babelify');
var merge       = require('merge-stream');
var browserSync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var enabled     = require('../enabled');
var manifest    = require('asset-builder')('./manifest.json');
var paths       = manifest.paths;

function onBundleError(error){
  gutil.log(
    gutil.colors.red("Browserify error:"), 
    error.message
  );
  this.emit('end');
}

module.exports = function(){

  var merged = merge();

  manifest.forEachDependency('js', function(dependency){

    // Run browserify + sourcemaps + etc on each dependency
    merged.add(
      browserify({
        entries: dependency.globs,
        extensions: [".babel", ".js"],
        debug: true
      })
      .transform(babelify, {
        presets: ["es2015"],
        extensions: [".babel"]
      })
      .bundle()
      .on('error', onBundleError)
      .pipe(source(dependency.name)) // .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(
        gulpif(enabled.maps, sourcemaps.init({loadMaps: true}))
      )
      .pipe(uglify())
      .pipe(
        gulpif(enabled.maps, sourcemaps.write('.', {
          sourceRoot: paths.source + 'js/'
        }))
      )
      .pipe(gulp.dest(paths.dist + 'js'))
    )

  });

  // Copy libs over as they are
  merged.add(
    gulp.src([
      paths.source + '/js/lib/**/*'
    ])
    .pipe(
      gulp.dest(paths.dist + '/js/lib/')
    )
  );

  return merged.pipe(browserSync.stream());

}