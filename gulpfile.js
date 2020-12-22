const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore unnecessary files
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!node_modules{,/**}',
    '!private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store'
  ]);
}

// JavaScript and JSON linter
function lintJs () {
  return gulp.src(addDefSrcIgnore(['**/*.js', '**/*.json']), {dot: true})
    .pipe($.eslint({dotfiles: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

// Remove solutions from exercises
function removeSolutions () {
  del.sync('dist');
  return gulp.src(addDefSrcIgnore(['**', '!**/REMOVE{,/**}']), {dot: true})
    .pipe($.replace(/^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm, ''))
    .pipe(gulp.dest('dist'));
}

// Prepare for distribution to students
function updateConfigForSlave (done) {
  let npmConfig = require('./package.json');
  npmConfig.scripts.install = 'cd server && npm i .';
  npmConfig.scripts.precommit = 'cd server && gulp lint';
  npmConfig = JSON.stringify(npmConfig, null, 2).replace(/-master/g, '');
  fs.writeFileSync('dist/package.json', npmConfig);

  done();
}

// Lint all files
exports.lint = gulp.parallel(
  lintJs,
);


// Prepare for distribution to students
exports.dist = gulp.series(
  removeSolutions,
  updateConfigForSlave
);