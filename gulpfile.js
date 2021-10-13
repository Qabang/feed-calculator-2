const { src, dest, parallel } = require('gulp')
const gulp = require('gulp')
const pug = require('gulp-pug')
const less = require('gulp-less')
const sass = require('gulp-sass')(require('sass'))
const minifyCSS = require('gulp-csso')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const sassDoc = require('sassdoc')

// Path to source files
let js_path = 'assets/scripts/*.js'
let scss_path = 'assets/scss/*.scss'

function scss() {
  return (
    src(scss_path)
      // Compile SASS files
      .pipe(
        sass({
          precision: 10,
          includePaths: ['.'],
          onError: console.error.bind(console, 'Sass error:'),
        })
      )
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer())
      // Minify the file
      .pipe(minifyCSS())
      // Output
      .pipe(dest('assets/build/css'))
  )
}

/**
 * Documents the project based on scss files.
 */
function sassdoc() {
  return gulp.src(scss_path).pipe(sassDoc()).resume()
}

function js() {
  return (
    src(js_path, { sourcemaps: true })
      .pipe(
        babel({
          presets: ['@babel/preset-env'],
        })
      )
      // Minify the file
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      // Output
      .pipe(dest('assets/build/js'), { sourcemaps: true })
  )
}

function watch() {
  gulp.watch(scss_path, gulp.series('scss'))
  gulp.watch(js_path, gulp.series('js'))
}

exports.js = js
exports.scss = scss
exports.sassdoc = sassdoc
exports.watch = watch
exports.default = parallel(scss, js)
