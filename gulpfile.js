var argv         = require('minimist')(process.argv.slice(2));
var gulp         = require('gulp');
var runSequence  = require('run-sequence');

// See https://github.com/austinpray/asset-builder
var manifest = require('asset-builder')('./manifest.json');

// `paths` - Paths to base asset directories. With trailing slashes.
// - `paths.source` - Path to the source files. Default: `assets/`
// - `paths.dist` - Path to the build directory. Default: `dist/`
var paths = manifest.paths;

// `config` - Store arbitrary configuration values here.
var config = manifest.config || {};

// `globs` - These ultimately end up in their respective `gulp.src`.
// - `globs.js` - Array of asset-builder JS dependency objects. Example:
//   ```
//   {type: 'js', name: 'main.js', globs: []}
//   ```
// - `globs.css` - Array of asset-builder CSS dependency objects. Example:
//   ```
//   {type: 'css', name: 'main.css', globs: []}
//   ```
// - `globs.fonts` - Array of font path globs.
// - `globs.images` - Array of image path globs.
// - `globs.bower` - Array of all the main Bower files.
var globs = manifest.globs;

gulp.task('html'   , require('./gulp/task/html'));
gulp.task('jshint' , require('./gulp/task/jshint'));
gulp.task('scripts', require('./gulp/task/scripts'));
gulp.task('server' , require('./gulp/task/server'));
gulp.task('styles' , require('./gulp/task/styles'));
gulp.task('clean'  , require('./gulp/task/clean'));
gulp.task('images' , require('./gulp/task/images'));
gulp.task('fonts'  , require('./gulp/task/fonts'));

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', function(callback){
  runSequence('styles', 'scripts', 'html', 'images', callback);
});

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', ['server'], function(){
  gulp.watch([paths.source + 'scss/**/*'], ['styles']);
  gulp.watch([paths.source + 'js/**/*'],   ['scripts']);
  gulp.watch([paths.source + '**/*{html,.,xml,txt}'], ['html']);
  gulp.watch([paths.source + 'images/**/*'], ['images']);
  gulp.watch([paths.source + 'fonts/**/*'], ['fonts']);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});