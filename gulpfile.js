'use strict';
 
var gulp = require('gulp');
var plumber = require('gulp-plumber'); // чтобы gulp не крашился при ошибках и продолжал работу

var rename = require('gulp-rename');

var server = require('browser-sync').create();

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer'); // это плагин для postcss

/* Опимизации и минификации */
var cssminify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var del = require('del');

/* Сборка и минификация css из scss */
gulp.task('style', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber()) 
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest('build/css/'))
    .pipe(cssminify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

/* Работа с изображениями */
gulp.task('images', function () {
  return gulp.src('build/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imageminJpegRecompress({
        progressive: true,
        max: 80,
        min: 70
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

/* Служебные таски для сборки */

gulp.task('copy', function () {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2,txt}',
    'src/img/**',
    'src/js/**/*.js',
    'src/*.html'
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('copy-html', function () {
  return gulp.src('src/*.html', {base: 'src'})
    .pipe(gulp.dest('build'));
});

gulp.task('copy-js', function () {
  return gulp.src('src/js/**/*.js', {base: 'src'})
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', function () {
  return del('build');
});

/* Сборка */
gulp.task('build', gulp.series([
  'clean',
  'copy',
  'style',
  'images'
]));

/* Запуск сервера и отслеживание изменений */
gulp.task('serve', function () {
  server.init({
    server: 'build/'
  });

  gulp.watch('src/sass/**/*.scss', gulp.series(['style']));
  gulp.watch('src/*.html').on('change', gulp.series(['copy-html', server.reload]));
  gulp.watch('src/js/**/*.js').on('change', gulp.series(['copy-js', server.reload]));
});