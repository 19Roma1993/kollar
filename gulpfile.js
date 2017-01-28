var gulp = require('gulp'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('jade', function(){
  return gulp.src('app/jade/*.jade')
    .pipe(jade({
      pretty: '\t',
      self: true,
      cache: false,
      debug: false,
      compileDebug: false
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('sass', function(){
  return gulp.src('app/scss/style.scss')
    .pipe(sass({
      outputStyle:'expanded'
    }))
    .pipe(autoprefixer({
      browsers: ['> 5%',
                 'Firefox >= 15',
                 'ie >= 8',
                 'iOS 7']
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/**')
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('images', function() {
    return gulp.src('app/images/**/**')
        .pipe(gulp.dest('build/images'))
});

gulp.task('upload', function() {
    return gulp.src('app/upload/**/**')
        .pipe(gulp.dest('build/upload'))
});

gulp.task('watch', function(){
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('build/index.html',reload);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/fonts/**/**', ['fonts']);
  gulp.watch('app/images/**/**', ['images']);
  gulp.watch('app/upload/**/**', ['upload']);
  gulp.watch('build/js/**/script.js',reload);
});

gulp.task('server',['watch'], function(){
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    logConnections: false,
    logFileChanges: true,
    notify: true,
    reloadDelay: 1000
  });
});

gulp.task('default', ['jade', 'sass', 'js', 'fonts', 'images', 'upload','server']);