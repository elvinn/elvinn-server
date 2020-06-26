const gulp = require('gulp');
const yarn = require('gulp-yarn');

function postBuild() {
  return gulp.src([
    './src/**/package.json',
    './src/**/yarn.lock',
    '!./src/**/node_modules/**/package.json',
  ])
    .pipe(gulp.dest('dist'));
    // .pipe(yarn({ production: true }));
}

async function init() {
  const installProject = gulp.src([
    './package.json',
    './yarn.lock',
  ]).pipe(yarn());
  const installSrc = gulp.src([
    './src/**/package.json',
    './src/**/yarn.lock',
    '!./src/**/node_modules/**/package.json',
  ]).pipe(yarn());

  return Promise.all([installProject, installSrc]);
}

module.exports = {
  init,
  postBuild,
};
