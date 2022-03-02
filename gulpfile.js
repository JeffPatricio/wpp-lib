const gulp = require("gulp");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const rollup = require("@rollup/stream");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");

var cache;

gulp.task("prod", function () {
  return rollup({
    input: "./modules/init.js",
    plugins: [babel(), commonjs(), nodeResolve(), uglify()],
    cache,
    output: {
      format: "iife",
    },
  })
    .on("bundle", function (bundle) {
      cache = bundle;
    })
    .pipe(source("inject.js"))
    .pipe(buffer())
    .pipe(gulp.dest("./"));
});

gulp.task("dev", function () {
  return rollup({
    input: "./modules/init.js",
    plugins: [babel(), commonjs(), nodeResolve()],
    cache,
    output: {
      format: "iife",
    },
  })
    .on("bundle", function (bundle) {
      cache = bundle;
    })
    .pipe(source("inject.js"))
    .pipe(buffer())
    .pipe(gulp.dest("./"));
});

gulp.task("default", gulp.series("prod"));
