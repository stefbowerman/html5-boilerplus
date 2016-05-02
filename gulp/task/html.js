// ### Clean
//  `gulp html`
//  Copies over all html, xml, txt, etc files into the dist directory.
//  Excludes files contained in the 'partials' directory.
//  Includes partials in .html files using gulp-file-include

var gulp        = require('gulp');
var fileInclude = require('gulp-file-include');
var browserSync = require('browser-sync');
var paths       = require('asset-builder')('./manifest.json').paths;

module.exports = function(){
  gulp.src([
    paths.source + '**/*{html,.,xml,txt}', // Add more extensions as needed, files will be copied over in place to the dist directory
    paths.source + '.htaccess', // Because I suck and don't want to figure how to sneak this into the glob in the above line
    '!' + paths.source + 'partials{,/**}' // Do not include the partials directory, only used for file includes
  ])
  .pipe(fileInclude({
    prefix: '@@',
    basePath: paths.source
  }))
  .pipe(
    gulp.dest(paths.dist)
  )
  .pipe(
    browserSync.stream()
  );
}