// ### Clean
// `gulp clean` - Deletes the build folder entirely.

var gulp  = require('gulp');
var del   = require('del');
var paths = require('asset-builder')('./manifest.json').paths;

module.exports = function(){

  return del( paths.dist );

}