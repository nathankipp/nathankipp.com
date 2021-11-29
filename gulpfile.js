'use strict';

const browserSync = require("browser-sync").create();
const { watch, src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

const BUILD_DIR = "./docs";

const sassify = () => src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(`${BUILD_DIR}/`));

const COPY = [
  { from: './index.js', to: `${BUILD_DIR}/` }
];
const copyFromTo = ({ from, to }) => src(from).pipe(dest(to));
const copy = () => COPY.forEach(copyFromTo);

const writeIndexHtml = () =>
  src(["./partials/header.html", "./body.html", "./partials/footer.html"])
    .pipe(concat("index.html"))
    .pipe(dest(`${BUILD_DIR}/`));

function defaultTask(cb) {
  sassify();
  copy();
  writeIndexHtml();

  browserSync.init({
    server: { baseDir: BUILD_DIR },
  });

  watch(["./index.*", "./body.html", "./partials/*.*", "./scss/*.*"], function (cb) {
    sassify();
    copy();
    writeIndexHtml();
    browserSync.reload();
    cb();
  });
}

exports.default = defaultTask;
