var gulp        = require('gulp');
var fileInclude = require('gulp-file-include');
var refresh     = require('gulp-livereload');
var preprocess  = require('gulp-preprocess');
var minifyHTML  = require('gulp-minify-html');

module.exports = function () {
  return gulp.src([
    '!public/src/partials{,/**}',
    'public/src/**/*{html,.,xml,txt}' // Add more extensions as needed, files will be copied over in place to the dist directory
    ])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(minifyHTML({
      empty: true,
      conditionals: true,
      loose: true
    }))
    // .pipe(preprocess({context: { dev: true }}))
    .pipe(gulp.dest('public/dist'))
    .pipe(refresh(global.lrserver));
};
