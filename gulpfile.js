const browserSync = require("browser-sync").create();
const { watch, src, dest } = require("gulp");
const concat = require("gulp-concat");

const BUILD_DIR = "./docs";

const COPY = [
  { from: './index.css', to: `${BUILD_DIR}/` },
  { from: './index.js', to: `${BUILD_DIR}/` }
];
const copyFromTo = ({ from, to }) => src(from).pipe(dest(to));
const copy = () => COPY.forEach(copyFromTo);

const writeIndexHtml = () =>
  src(["./partials/header.html", "./body.html", "./partials/footer.html"])
    .pipe(concat("index.html"))
    .pipe(dest(`${BUILD_DIR}/`));

function defaultTask(cb) {
  copy();
  writeIndexHtml();

  browserSync.init({
    server: { baseDir: BUILD_DIR },
  });

  watch(["./index.*", "./partials/*.*"], function (cb) {
    copy();
    writeIndexHtml();
    browserSync.reload();
    cb();
  });
}

exports.default = defaultTask;
