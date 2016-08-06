var gulp = require('gulp')
var sass = require('gulp-sass')
var swig = require('gulp-swig')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var ftp = require('gulp-ftp')
var gutil = require('gulp-util')

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'  // 此配置使文件编译并输出压缩过的文件
  }))
  .pipe(gulp.dest('dist/static'))
})

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
  .pipe(gulp.dest('dist/static'))
})

gulp.task('tpl', function () {
  return gulp.src('src/tpl/*.swig')
  .pipe(swig({
    defaults: {
      cache: false  // 此配置强制编译文件不缓存
    }
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('sass:dev', function () {
  return gulp.src('src/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/static'))
  .pipe(reload({stream: true}))
})

gulp.task('js:dev', function () {
  return gulp.src('src/js/*.js')
  .pipe(gulp.dest('dist/static'))
  .pipe(reload({stream: true}))
})

gulp.task('tpl:dev', function () {
  return gulp.src('src/tpl/*.swig')
  .pipe(swig({
    defaults: {
      cache: false  // 此配置强制编译文件不缓存
    }
  }))
  .pipe(gulp.dest('dist'))
  .pipe(reload({stream: true}))
})

gulp.task('dev', ['js:dev', 'sass:dev', 'tpl:dev'], function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    notify: false
  })
  gulp.watch('src/js/*.js', ['js:dev'])
  gulp.watch('src/sass/*.scss', ['sass:dev'])
  gulp.watch('src/tpl/*.swig', ['tpl:dev'])
})

gulp.task('build', ['sass', 'js', 'tpl'])

gulp.task('upload', function () {
  return gulp.src('dist/**')
  .pipe(ftp({
    host: '8.8.8.8',  // 远程主机ip
    port: 22,  // 端口
    user: 'username',  // 帐号
    pass: 'password',  // 密码
    remotePath: '/project'  // 上传路径，不存在则新建
  }))
  .pipe(gutil.noop())
})
