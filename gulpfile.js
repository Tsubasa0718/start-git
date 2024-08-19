import gulp from 'gulp';
import dartSass from 'gulp-dart-sass';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

// Sassのコンパイルとベンダープレフィックスの自動付与
function compileSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(dartSass({ outputStyle: 'compressed' }).on('error', dartSass.logError))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// JavaScriptの圧縮
function compressJs() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

// ブラウザの自動リロード
function serve() {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('src/scss/**/*.scss', compileSass);
  gulp.watch('src/js/**/*.js', compressJs);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
}

// buildタスクの定義
export function build(done) {
  return gulp.series(
    gulp.parallel(compileSass, compressJs)
  )(done); // 非同期完了を示す
}

// デフォルトタスク
export default gulp.series(
  build,
  serve
);
