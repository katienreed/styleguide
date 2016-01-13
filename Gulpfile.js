var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var history = require('connect-history-api-fallback');
var jsonSass = require('gulp-json-sass');
var header = require('gulp-header');
var gutil = require('gulp-util');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var fontName = 'icons';

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  var prettyJSON = JSON.stringify(string);
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(prettyJSON) }))
    this.push(null)
  }
  return src
}

gulp.task('scripts', function(){
  browserify({
    entries: './src/js/index.js',
    extensions: ['.es6', '.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error', gutil.log)
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});

gulp.task('icons', function(){
  gulp.src(['./src/lib/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './src/lib/scss/_icons-template.scss',
      targetPath: '../../src/scss/base/_icons.scss',
      fontPath: '/fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true,
      fixedWidth: true,
      centerHorizontally: true,
      fontHeight: 1001
    }))
    .on('glyphs', function(glyphs, options) {
      var formattedGlyphs = glyphs.map( (glyph) => {
        return {
          "name": glyph.name,
        }
      });
      string_src('_icons.json', formattedGlyphs).pipe(gulp.dest("./src/lib/"));
    })
    .pipe(gulp.dest('././public/fonts/'));
});

gulp.task('styles', function(){
  gulp.src('./src/scss/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true}))
  .pipe(minifyCSS({processImport: false}))
  .pipe(autoprefix())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});

gulp.task('scss-lint', function(){
  gulp.src('./src/scss/**/*.scss')
    .pipe(scsslint({
      'config': __dirname + '/scss-lint.yml'
    }))
    .pipe(scsslint.failReporter('E'));
});

gulp.task('colors', function(){
  var source = './src/lib/_colors.json';
  var banner = "// generated from <%= source %> by gulp-json-sass\n\n";
  gulp.src(source)
  .pipe(jsonSass())
  .pipe(header(banner, {source: source}))
  .pipe(gulp.dest('./src/scss/base/'));
});

gulp.task('server', ['icons', 'colors', 'styles', 'scripts'], function(){
  connect.server({
    root: ['public'],
    port: gutil.env.port || 8081,
    livereload: true,
    middleware: function() {
      return [
        history()
      ]
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('src/lib/icons/**', ['icons']);
  gulp.watch('src/lib/scss/_icons-template.scss', ['icons']);
  gulp.watch('src/lib/_colors.json', ['colors']);
  gulp.watch('src/scss/**', ['scss-lint', 'styles']);
  gulp.watch('src/js/**', ['scripts']);
});

gulp.task('package:css', ['icons', 'colors'], function(){
  gulp.src('./lib/namely-ui.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['server', 'watch']);
