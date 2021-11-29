'use strict';

const browserSync = require("browser-sync").create();
const { watch, src, dest } = require("gulp");
const minify = require("gulp-minify");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

const BUILD_DIR = "./docs";

const minime = () => src(['./index.js'])
    .pipe(minify({ noSource: true }))
    .pipe(dest(`${BUILD_DIR}/`));

const sassify = () => src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(`${BUILD_DIR}/`));

const writeIndexHtml = () =>
  src(["./partials/header.html", "./body.html", "./partials/footer.html"])
    .pipe(concat("index.html"))
    .pipe(dest(`${BUILD_DIR}/`));

const build = () => {
  minime();
  sassify();
  writeIndexHtml();
}

function defaultTask(cb) {
  build();

  browserSync.init({
    server: { baseDir: BUILD_DIR },
  });

  watch(["./index.*", "./body.html", "./partials/*.*", "./scss/*.*"], function (cb) {
    build();
    browserSync.reload();
    cb();
  });
}

exports.default = defaultTask;
