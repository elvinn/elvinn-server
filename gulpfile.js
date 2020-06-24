const gulp = require('gulp');
const yarn = require('gulp-yarn');

function postBuild() {
  return gulp.src([
    './src/**/package.json',
    './src/**/yarn.lock',
    '!./src/**/node_modules/**/package.json',
  ])
    .pipe(gulp.dest('dist'))
    .pipe(yarn({ production: true }));
}

module.exports = {
  postBuild,
};
