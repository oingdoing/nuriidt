'use strict';

import gulp from 'gulp';
import del from 'del';
import gulpimage from 'gulp-image';
import babel from 'gulp-babel';
import { htmlValidator } from 'gulp-w3c-html-validator';
import inquirer from 'inquirer';
import changed, {
  compareContents,
  compareLastModifiedTime,
} from 'gulp-changed';
import debug from 'gulp-debug';
import beautify from 'gulp-beautify';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';
import gulppug from 'gulp-pug';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import spritesmith from 'gulp.spritesmith-multi';
import merge from 'merge-stream';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const beautifyOptions = {
  indent_size: 4,
  inline: ['code', 'pre', 'br'],
};

browserSync.create();

//////////////// FILE LOCATION ///////////////////////
let key;
let ROUTES;
let STATE;

const SELECT_TASK = (v) => {
  if (v === 'DEV') {
    STATE = 'dist';
  } else if (v === 'BUILD') {
    STATE = 'build';
  }
};

const DIR = {
  SRC: 'sources',
};

const ROUTES_INIT = () => {
  ROUTES = {
    SRC: {
      FONT: DIR.SRC + '/resources/fonts/',
      VIDEO: DIR.SRC + '/resources/video/',
      IMG: DIR.SRC + '/resources/images/',
      CSS: DIR.SRC + '/resources/scss/',
      JS: DIR.SRC + '/resources/js/',
      LIB: DIR.SRC + '/resources/lib/',
      SPRITE: DIR.SRC + '/resources/images/sprite/',
      PUG: DIR.SRC + '/',
      INCLUDE: [
        DIR.SRC + '/__includes',
        DIR.SRC + '/__template',
      ],
      PATH: DIR.SRC + '/__path',
    },
    DIST: {
      FONT: STATE + '/static/fonts/',
      VIDEO: STATE + '/static/video/',
      IMG: STATE + '/static/images/',
      CSS: STATE + '/static/css/',
      JS: STATE + '/static/js/',
      LIB: STATE + '/static/lib/',
      SPRITE: STATE + '/static/images/',
      PUG: STATE + '/',
      INCLUDE: STATE + '/',
      PATH: STATE + '/__path',
    },
  };
};

//////////////// TASK ///////////////////////


//단순히 파일 옮기기
const move = {
  image(src, dest) {
    return gulp
      .src([src + '/**/*.{jpg,png,gif,ico}', '!**/sprite/**/*.png'])
      .pipe(changed(dest, { hasChanged: changed.compareContents }))
      .pipe(debug({ title: 'MOVE IMG:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }));
  },
  font(src, dest) {
    return gulp
    .src([src + '/**/*'])
      .pipe(changed(dest, { hasChanged: changed.compareContents }))
      .pipe(debug({ title: 'MOVE FONT:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }));
  },
  video(src, dest) {
    return gulp
    .src([src + '/*'])
      .pipe(changed(dest, { hasChanged: changed.compareContents }))
      .pipe(debug({ title: 'MOVE VIDEO:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }));
  },
  lib(src, dest) {
    return gulp
    .src([src + '/**/*'])
      .pipe(changed(dest, { hasChanged: changed.compareContents }))
      .pipe(debug({ title: 'MOVE Library:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }));
  },
  path(src, dest) {
    return gulp
    .src([src + '/*.html', '!/*.pug'])
      .pipe(changed(dest, { hasChanged: changed.compareContents }))
      .pipe(debug({ title: 'MOVE HTML:' }))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }));
  },
};

const compile = {
  pug() {
    return (
      gulp
        // .src('sources/html+ '/**/*.pug', { since: gulp.lastRun(compile.pug) })
        .src(
          [
            ROUTES.SRC.PUG + '/**/*.pug',
            '!' + ROUTES.SRC.PUG + '/__includes/**/*.pug',
            // '!' + ROUTES.SRC.PUG + '/__modals/**/*.pug',
            '!' + ROUTES.SRC.PUG + '/__template/**/*.pug',
          ],
          {
            since: gulp.lastRun(compile.pug),
          },
        )
        .pipe(gulppug({ basedir: './sources' }))
        .pipe(beautify.html(beautifyOptions))
        .pipe(debug({ title: 'PUG -> HTML:' }))
        .pipe(gulp.dest(STATE + '/'))
        .pipe(browserSync.reload({ stream: true }))
    );
  },
  include() {
    return (
      gulp
        .src(ROUTES.SRC.PUG + '/**/*.pug')
        .pipe(gulppug({ basedir: './sources' }))
        .pipe(beautify.html(beautifyOptions))
        .pipe(debug({ title: 'INCLUDE -> HTML:' }))
        .pipe(gulp.dest(STATE + '/'))
        .pipe(browserSync.reload({ stream: true }))
    );
  },
  css(src, dest) {
    return (
      gulp
        .src(src + '/**/*.{scss, css}')
        // use glob imports
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(
          sass({ outputStyle: 'compressed' }) //expanded, compressed
            .on('error', sass.logError),
        )
        .pipe(
          autoprefixer({
            development: [
              'last 2 chrome version',
              'last 2 firefox version',
              'last 2 safari version',
              'last 1 ie version',
            ],
          }),
        )
        .pipe(sourcemaps.write('./maps'))
        .pipe(debug({ title: 'SCSS -> CSS:' }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({ stream: true }))
    );
  },
  js(src, dest) {
    return (
      gulp
        .src(src + '**/*.js')
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(debug({ title: 'JS 동작:' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({ stream: true }))
    );
  },
  sprite(srcimg, srccss, destimg) {
    let opts = {
      spritesmith: function (options, sprite, icons) {
        options.cssName = `_${sprite}-sprite.scss`;
        options.cssSpritesheetName = sprite;
        options.padding = 10;
        options.imgPath =  `${options.imgName}`;
        options.cssVarMap = function (sp) {
          sp.name = `${sprite}-${sp.name}`;
        };
        options.cssTemplate =
          './sources/resources/images/sprite/handlebarsStr.css.handlebars';

        return options;
      },
    };

    let spriteData = gulp
      .src([srcimg + '/**/*.png', '!*.png'])
      .pipe(debug({ title: '스프라이트 동작:' }))
      .pipe(spritesmith(opts))
      .on('error', function (err) {
        console.log(err);
      });

    let imgStream = spriteData.img.pipe(gulp.dest(destimg+'/sprite/'));

    let cssStream = spriteData.css
      .pipe(gulp.dest(srccss+'/sprite/'))
      .pipe(browserSync.reload({ stream: true }));

    return merge([imgStream, cssStream]);
  },
};

// 작업을 위한 라이브서버 및 WATCH
const live = {
  watch() {
    let watcher = {
      image: gulp.watch(ROUTES.SRC.IMG, moveImageDist),
      video: gulp.watch(ROUTES.SRC.VIDEO, moveVideoDist),
      font: gulp.watch(ROUTES.SRC.FONT, moveFontDist),
      path: gulp.watch(ROUTES.SRC.PATH, movePathDist),
      lib: gulp.watch(ROUTES.SRC.LIB, moveLibDist),
      pug: gulp.watch(
        [
          ROUTES.SRC.PUG,
          '!' + ROUTES.SRC.PUG + '/__includes/**/*.pug',
          '!' + ROUTES.SRC.PUG + '/__templete/**/*.pug',
        ],
        compile.pug,
      ),
      include: gulp.watch(ROUTES.SRC.INCLUDE, compile.include),
      css: gulp.watch(ROUTES.SRC.CSS, compileCssToDist),
      js: gulp.watch(ROUTES.SRC.JS, compileJsToDist),
      sprite: gulp.watch(ROUTES.SRC.SPRITE, compileSpriteToDist),
    };
  },
  server() {
    browserSync.init({
      port: 5000,
      open: 'ui',
      browser: ['chrome'],
      startPath: '__path/path.html',
      server: {
        baseDir: 'dist/',
        directory: true,
      },
    });
  },
};

// watch ...
const clean = () => del([STATE]);
const moveImageDist = () => move.image(ROUTES.SRC.IMG, ROUTES.DIST.IMG);
const moveVideoDist = () => move.video(ROUTES.SRC.VIDEO, ROUTES.DIST.VIDEO);
const moveFontDist = () => move.font(ROUTES.SRC.FONT, ROUTES.DIST.FONT);
const movePathDist = () => move.path(ROUTES.SRC.PATH, ROUTES.DIST.PATH);
const moveLibDist = () => move.lib(ROUTES.SRC.LIB, ROUTES.DIST.LIB);

const compileCssToDist = () => compile.css(ROUTES.SRC.CSS, ROUTES.DIST.CSS);
const compileJsToDist = () => compile.js(ROUTES.SRC.JS, ROUTES.DIST.JS);
const compileSpriteToDist = () =>
  compile.sprite(ROUTES.SRC.SPRITE, ROUTES.SRC.CSS, ROUTES.DIST.SPRITE);
const improveImageMin = () =>
  improve.imagemin(
    [ROUTES.SRC.IMG + '/**/*.{jpg,png,gif}', '!/**/sprite/*.png'],
    ROUTES.DIST.IMG,
  );
const improveValidation = () => improve.validationHTML();

//빌드 시 개선
const improve = {
  imagemin(src, dist) {
    return gulp.src(src).pipe(gulpimage()).pipe(gulp.dest(dist));
  },
  validationHTML() {
    return gulp
      .src([
        ROUTES.DIST.PUG + '*.html',
        '!build/**/__includes/*.html',
      ])
      .pipe(
        htmlValidator.analyzer({
          ignoreLevel: 'warning',
          ignoreMessages: /^Duplicate ID/,
        }),
      )
      .pipe(htmlValidator.reporter());
  },
};

//////////////// EXECUTE (Dist) ///////////////////////
const resetDist = gulp.series([clean]);
const moveFileDist = gulp.parallel([
  moveImageDist,
  moveVideoDist,
  moveFontDist,
  movePathDist,
  moveLibDist,
]);
const compileDist = gulp.series([
  compileSpriteToDist,
  gulp.parallel(compile.pug, compileCssToDist, compileJsToDist),
]);
const distTask = gulp.series([moveFileDist, compileDist]);
const distTaskLive = gulp.series([gulp.parallel(live.watch, live.server)]);

const dev = gulp.series([resetDist, distTask, distTaskLive]);
const build = gulp.series([resetDist, distTask, improveValidation]);
const buildLight = gulp.series([resetDist, distTask]);
const buildHtmlValidation = gulp.series([
  resetDist,
  moveFontDist,
  compile.pug,
  improveValidation,
]);
const buildCss = gulp.series([
  resetDist,
  moveFileDist,
  compileSpriteToDist,
  compileCssToDist,
]);
const buildImageMin = gulp.series([
  resetDist,
  compileSpriteToDist,
  improveImageMin,
]);

export const run = () => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'task',
        message: 'Select Task!!',
        choices: ['DEV', 'BUILD'],
      },
      {
        type: 'list',
        name: 'src',
        message: 'Select SRC',
        choices: [
          'ALL',
          'HTML + CSS + Image Min',
          'HTML Validation',
          'CSS',
          'Image Min',
        ],
        when(answers) {
          return answers.task === 'BUILD';
        },
      },
    ])
    .then((answers) => {
      if (answers.task == 'DEV') {
        SELECT_TASK(answers.task);
        dev();
      } else {
        // Build
        SELECT_TASK(answers.task);

        if (answers.src == 'ALL') {
          build();
        } else if (answers.src == 'HTML + CSS + Image Min') {
          buildLight();
        } else if (answers.src == 'HTML Validation') {
          buildHtmlValidation();
        } else if (answers.src == 'CSS') {
          buildCss();
        } else if (answers.src == 'Image Min') {
          buildImageMin();
        }
      }
      ROUTES_INIT();
    });
};