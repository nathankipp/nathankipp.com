const browserSync = require("browser-sync").create();
const { watch, src, dest } = require("gulp");
const concat = require("gulp-concat");

function clean() {
  console.log("starting clean()");

  console.log("done with clean()");
}

const BUILD_DIR = "./docs";
const F_SITES_DIST = "./node_modules/foundation-sites/dist";

const COPIES = [{ from: `./css/*.*`, to: `${BUILD_DIR}/css/` }];
const copyFromTo = ({ from, to }) => src(from).pipe(dest(to));
const copy = () => COPIES.forEach(copyFromTo);

const PAGES = ["index.html"];
const writePage = (page) =>
  src(["./partials/header.html", page, "./partials/footer.html"])
    .pipe(concat(page))
    .pipe(dest(`${BUILD_DIR}/`));
const write = () => PAGES.forEach(writePage);

function defaultTask(cb) {
  copy();
  write();

  browserSync.init({
    server: { baseDir: BUILD_DIR },
  });

  watch(["./*.html", "./css/*.*", "./partials/*.*"], function (cb) {
    copy();
    write();
    browserSync.reload();
    cb();
  });
}

exports.default = defaultTask;
