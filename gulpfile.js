const gulp = require('gulp');
const { installSubDir } = require('./src/scripts/install');

async function postBuild() {
  await gulp.src([
    './src/**/package.json',
    './src/**/yarn.lock',
    '!./src/**/node_modules/**/package.json',
  ])
    .pipe(gulp.dest('dist'));
  
  return installSubDir('dist/cloudfunctions');
}

async function init() {
  return installSubDir('src/cloudfunctions');
}

module.exports = {
  init,
  postBuild,
};
