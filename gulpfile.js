'use strict';

const gulp        = require('gulp');
const del         = require('del');
const util        = require('gulp-util');
const sass        = require('gulp-sass');
const prefixer    = require('gulp-autoprefixer');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const sourcemaps  = require('gulp-sourcemaps');
const rename      = require('gulp-rename');
const handlebars  = require('gulp-compile-handlebars');
const browserSync = require('browser-sync');
const ghPages     = require('gulp-gh-pages');
const sassGlob    = require('gulp-sass-bulk-import');
const watch       = require('gulp-watch');
const babel       = require('gulp-babel');
const eslint      = require('gulp-eslint');
const fs          = require('fs');

var paths = {
  src: { root: 'src' },
  dist: { root: 'dist' },
  init: function() {
    this.src.sass        = this.src.root + '/scss/main.scss';
    this.src.templates   = this.src.root + '/**/*.hbs';
    this.src.javascript  = [this.src.root + '/js/**/*.js', '!' + this.src.root + '/js/libs/*.js'];
    this.src.libs        = this.src.root + '/js/libs/**/*.js';
    this.src.csslibs     = this.src.root + '/css/libs/**/*.*';
    this.src.images      = this.src.root + '/images/**/*.{jpg,jpeg,svg,png,gif}';
    this.src.files        = this.src.root + '/*.{html,txt,xml,png,ico,svg,webmanifest}';
    this.src.webfonts    = this.src.root + '/webfonts/*.*';
    this.src.downloads   = this.src.root + '/downloads/*.*';
    this.src.phpFiles    = this.src.root + '/php/*.*';

    this.dist.css        = this.dist.root + '/css';
    this.dist.images     = this.dist.root + '/images';
    this.dist.javascript = this.dist.root + '/js';
    this.dist.libs       = this.dist.root + '/js/libs';
    this.dist.csslibs    = this.dist.root + '/css/libs';
    this.dist.webfonts   = this.dist.root + '/webfonts';
    this.dist.downloads  = this.dist.root + '/downloads';
    this.dist.phpFiles   = this.dist.root + '/php';

    return this;
  },
}.init();

gulp.task('serve', () => {
  browserSync.init({
    server: paths.dist.root,
    open: false,
    notify: false,

    // Whether to listen on external
    online: true,
  });
});

gulp.task('styles', () => {
  gulp.src([paths.src.sass])
    .pipe(sassGlob())
    .on('error', util.log)
    .pipe(sass({
      includePaths: ['src/scss'],
    }))
    .on('error', util.log)
    .pipe(prefixer('last 2 versions'))
    .on('error', util.log)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.reload({stream: true}));
});

/*
* Compile handlebars/partials into html
*/
gulp.task('templates', () => {
  let data = JSON.parse(fs.readFileSync('src/data/axis-ide-data.json'));
  var opts = {
    ignorePartials: true,
    batch: ['src/partials'],
  };

  gulp.src([paths.src.root + '/*.hbs'])
    .pipe(handlebars(data, opts))
    .on('error', util.log)
    .pipe(rename({
      extname: '.html',
    }))
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.root))
    .pipe(browserSync.reload({stream: true}));
});

/*
* Bundle all javascript files
*/
gulp.task('scripts', () => {
  gulp.src(paths.src.javascript)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('bundle.js'))
    .on('error', util.log)
    .pipe(uglify())
    .on('error', util.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.javascript))
    .pipe(browserSync.reload({stream: true}));

  /*
  * Uglify JS libs and move to dist folder
  */
  gulp.src([paths.src.libs])
    //.pipe(uglify())
    .on('error', util.log)
    .pipe(rename({
      suffix: '.min',
    }))
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.libs))
    .pipe(browserSync.reload({stream: true}));
});

/* 
* Lint *.js with ESlint
*/

gulp.task('lintjs', function () {
  return gulp.src('src/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
 });

/* 
* Copy images from src to dist
*/

gulp.task('images', () => {
  gulp.src([paths.src.images])
    .pipe(gulp.dest(paths.dist.images));
});

/* 
* Copy *.html and *.txt root files from src to dist
*/

gulp.task('files', () => {
  gulp.src([paths.src.files])
    .pipe(gulp.dest(paths.dist.root));
});

/* 
* Copy webfonts folder from src to dist
*/

gulp.task('webfonts', () => {
  gulp.src([paths.src.webfonts])
    .pipe(gulp.dest(paths.dist.webfonts));
});

/* 
* Copy downloads folder from src to dist
*/

gulp.task('downloads', () => {
  gulp.src([paths.src.downloads])
    .pipe(gulp.dest(paths.dist.downloads));
});

/* 
* Copy php files folder from src to dist
*/

gulp.task('phpFiles', () => {
  gulp.src([paths.src.phpFiles])
    .pipe(gulp.dest(paths.dist.phpFiles));
});

/* 
* Copy CSS libs folder from src to dist
*/

gulp.task('csslibs', () => {
  gulp.src([paths.src.csslibs])
    .pipe(gulp.dest(paths.dist.csslibs));
});


watch(paths.src.images, () => {
  gulp.start('images');
});

watch(paths.src.files, () => {
  gulp.start('files');
});

watch(paths.src.webfonts, () => {
  gulp.start('webfonts');
});

watch(paths.src.downloads, () => {
  gulp.start('downloads');
});

watch(paths.src.phpFiles, () => {
  gulp.start('phpFiles');
});

watch(paths.src.csslibs, () => {
  gulp.start('csslibs');
});

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch(paths.src.javascript, ['scripts']);
  gulp.watch(paths.src.templates, ['templates']);
  gulp.watch('src/data/axis-ide-data.json', ['templates']);
  gulp.watch('src/*.js', ['lintjs']);
});

gulp.task('deploy', () => {
  return gulp.src([paths.dist.root + '/**/*'])
    .pipe(ghPages());
});

gulp.task('default', ['watch', 'serve', 'images', 'files', 'webfonts', 'downloads', 'phpFiles', 'csslibs', 'lintjs','styles', 'scripts', 'templates']);
