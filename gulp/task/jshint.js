// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.

var gulp     = require('gulp');
var gulpif   = require('gulp-if');
var jshint   = require('gulp-jshint');
var enabled  = require('../enabled');
var manifest = require('asset-builder')('./manifest.json');
var project  = manifest.getProjectGlobs();

var src = ['bower.json', 'gulpfile.js'].concat(project.js);

module.exports = function() {
  return gulp.src( src )
    .pipe(
      jshint()
    )
    .pipe(
      jshint.reporter('jshint-stylish')
    )
    .pipe(
      gulpif(enabled.failJSHint, jshint.reporter('fail'))
    );
};