"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

var cssMinificator = require("gulp-csso");
var changeName = require("gulp-rename");
var imageOptimization = require("gulp-imagemin");
var convertToWebp = require("gulp-webp");
var deleteFolder = require("del");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css/"))
    .pipe(server.stream());
});

// проверяем и минифицируем файл
gulp.task("cssMinificator", function () {
  return gulp.src("build/css/*.css")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cssMinificator())                             // css minificator
    .pipe(changeName("style.min.css"))                      // rename minification file
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css/"))
    .pipe(server.stream());
});

// оптимизируем png jpg svg (https://www.npmjs.com/package/gulp-imagemin)
gulp.task("imageO", function() {
  return gulp.src("source/img/*.{png,jpg,svg}")
  .pipe(imageOptimization([
    imageOptimization.optipng({optimizationLevel: 3}),
    imageOptimization.mozjpeg({quality: 75}),
    imageOptimization.svgo({plugins: [{removeViewBox: true}, {cleanupIDs: false}]})])).pipe(gulp.dest("source/temp/"))
});

// копируем оптимизированные png jpg в build/img/
gulp.task("copyPngoJpgo", function() {
  return gulp.src("source/temp/*.{png,jpg}").pipe(gulp.dest("build/img/"))
})

// копируем из temp в build/img *.svg файлы
gulp.task("copySvg", function() {
  return gulp.src("source/temp/*.svg").pipe(gulp.dest("build/img/"))
});

// конвертируем png jpg изображения в webp
gulp.task("toWebp", function() {
  return gulp.src("source/temp/*.{png,jpg}").pipe(convertToWebp({quality: 85})).pipe(gulp.dest("build/img/"))
});

// удаляем build
gulp.task("deleteBuild", function() {
  return deleteFolder("build")
});

// удаляем temp
gulp.task("deleteTemp", function() {
  return deleteFolder("source/temp")
});

// удаляем build/img
gulp.task("deleteBuildImg", function() {
  return deleteFolder("build/img")
});

// копируем html в продакшн
gulp.task("copyHtml", function() {
  return gulp.src("source/*.html").pipe(gulp.dest("build/"))
});

// копируем js файлы
gulp.task("copyJS", function() {
  return gulp.src("source/js/*.js").pipe(gulp.dest("build/js"))
});

// копируем шрифты
gulp.task("copyFonts", function() {
  return gulp.src("source/fonts/*.{woff,woff2}").pipe(gulp.dest("build/fonts"))
});

// запуск сервера
gulp.task("server", function () {
  server.init({
    //server: "source/",
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  //gulp.watch("source/less/**/*.less", gulp.series("css"));
  //gulp.watch("source/*.html").on("change", server.reload);

  // custom:
  gulp.watch("source/less/**/*.less", gulp.series("css", "cssMinificator"));
  gulp.watch("source/*.html", gulp.series("copyHtml"));
  gulp.watch("source/img/*.{png,jpg,svg,webp}", gulp.series("deleteBuildImg", "imageO", "copySvg", "toWebp"))
  gulp.watch("source/*.html").on("change", server.reload)
});

gulp.task("refresh", function(done) {
  server.reload();
  done()
});

gulp.task("build", gulp.series("deleteBuild", "deleteTemp", "css", "cssMinificator", "imageO", "copyPngoJpgo", "copySvg", "toWebp", "copyHtml", "copyJS", "copyFonts", "deleteTemp"));

gulp.task("start", gulp.series("build", "server"));
