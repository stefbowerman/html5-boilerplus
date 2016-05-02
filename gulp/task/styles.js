//  ### Styles
//  `gulp styles` 
//  Compiles, combines, and optimizes project CSS.
//  By default this task will only log a warning if a precompiler error is
//  raised. If the `--production` flag is set: this task will fail outright.

var argv         = require('minimist')(process.argv.slice(2));
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var gutil        = require('gulp-util');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var enabled      = require('../enabled');
var manifest     = require('asset-builder')('./manifest.json');
var paths        = manifest.paths;

var options = {
  sass : {
    outputStyle : 'nested', // libsass doesn't support expanded yet
    precision : 10     
  },
  prefixer : {
    browsers : [
      'last 2 versions',
      'ie 8',
      'ie 9',
      'android 2.3',
      'android 4',
      'opera 12'
    ]
  },
  minify : {
    advanced : false,
    rebase : false
  }
};

function onSassError(error){
  gutil.log(
    gutil.colors.red("SASS Compilation Error:"), 
    gutil.colors.yellow('[line ' + error.line + ']'),
    error.message
  );
  if(!enabled.failStyleTask){
    // Allow the task to finish
    this.emit('end');
  }
}


module.exports = function(){
  return gulp.src(paths.source + 'scss/app.scss')
    .pipe(
      gulpif(enabled.maps, sourcemaps.init())
    )
    .pipe(
      sass( options.sass ).on('error', onSassError)
    )
    .pipe(
      autoprefixer( options.prefixer )
    )
    .pipe(
      minifyCss( options.minify )
    )
    .pipe(
      gulpif(enabled.maps, sourcemaps.write('.', {
        sourceRoot: paths.source + 'scss/'
      }))
    )
    .pipe(
      gulp.dest( paths.dist + 'css' )
    )
    .pipe(
      browserSync.stream()
    );
}