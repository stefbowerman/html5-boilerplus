var gulp        = require('gulp');

module.exports = function () {
  gulp.watch('public/src/**/*.html', ['copy:html']);
  gulp.watch('public/src/scss/**/*.scss', ['styles']);
  gulp.watch('public/src/js/**/*', ['scripts']);
  gulp.watch('public/src/img/**/*', ['copy:libs']);
};
