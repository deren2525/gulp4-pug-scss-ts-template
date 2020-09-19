"use strict";
const { src, dest, series, watch, lastRun, parallel } = require("gulp");
const gutil = require("gulp-util");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const packageImporter = require("node-sass-package-importer");
const typescript = require("gulp-typescript");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const prettify = require("gulp-prettify");
const htmlhint = require("gulp-htmlhint");
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

const PATHS = {
  pug: {
    src: "./src/pug/**/!(_)*.pug",
    dest: "./dist"
  },
  styles: {
    src: "./src/scss/**/*.scss",
    dest: "./dist/css"
  },
  scripts: {
    src: "./src/typescript/**/*.ts",
    dest: "./dist/js"
  },
  image: {
    src: "./src/image/**",
    dest: "./dist/image"
  }
};

// methods
function errorHandler(err, stats) {
  if (err || (stats && stats.compilation.errors.length > 0)) {
    const error = err || stats.compilation.errors[0].error;
    notify.onError({ message: "<%= error.message %>" })(error);
    this.emit("end");
  }
}

// pug
function pugFiles() {
  const option: { pretty: boolean } = {
    pretty: true
  };
  return src(PATHS.pug.src)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(pug(option))
    .pipe(dest(PATHS.pug.dest));
}

// scss
function styles() {
  return src(PATHS.styles.src)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(
      sass({
        outputStyle: "expanded",
        importer: packageImporter({
          extensions: [".scss", ".css"]
        })
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(dest(PATHS.styles.dest))
    .pipe(
      rename(function (path) {
        if (/^style_/.test(path.basename)) {
          path.basename = "style_latest";
        }
      })
    )
    .pipe(dest(PATHS.styles.dest))
    .pipe(browserSync.stream());
}

// typescript
function ts() {
  return src(PATHS.scripts.src)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(
      typescript({
        target: "ES6"
      })
    )
    .js.pipe(dest(PATHS.scripts.dest));
}

// images
function image() {
  return src(PATHS.image.src)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(changed(PATHS.image.dest))
    .pipe(imagemin([
      pngquant({
        quality: '65-80',
        speed: 1,
        floyd: 0,
      }),
      mozjpeg({
        quality: 85,
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(dest(PATHS.image.dest))
}

// server
const browserSyncOption = {
  open: false,
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: PATHS.pug.dest, // output directory,
    index: "index.html"
  }
};
function browsersync(done) {
  browserSync.init(browserSyncOption);
  done();
}

// browser reload
function browserReload(done) {
  browserSync.reload();
  done();
  console.info("Browser reload completed");
}

// watch
function watchFiles(done) {
  watch(PATHS.pug.src, series(pugFiles, browserReload));
  watch(PATHS.styles.src, styles);
  watch(PATHS.scripts.src, ts);
  watch(PATHS.image.src, image);
  done();
}

// commands
exports.default = series(
  parallel(styles, pugFiles, ts, image),
  series(browsersync, watchFiles)
);
