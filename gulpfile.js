/*
 * Publet --- online publishing platform
 * Copyright (C) 2016, Publet Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/* ==========================
Gulp Dev log block - move this to wiki before production

Resources used:
* using npm as a build tool: http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
* [babelify implementation example](https://gist.github.com/Fishrock123/8ea81dad3197c2f84366)

Availble commands:
* gulp run -a [app name]
  Runs specified client-side application at port 1337 w/ livereload & watches for changes

* gulp build -a [app name]
  Compiles the application from src -> dist

* gulp deploy -a [app name]
  Builds and then deploys specified client-side application to staging by default, production via '--production' flag

   ========================== */

// Gulp utils
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    argv = require('yargs').argv,
    flatten = require('gulp-flatten'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    rev = require('gulp-rev'),
    del = require('del'),
    git = require('./node/git'),
    concat = require('gulp-concat');

var Immutable = require('immutable');

var dev = argv.dev || false;

// The server flag refers to a configuration file in config/
var server = argv.server;
var appToBuild = argv.a;

if (!server) {
  console.log('WARNING: Using default as the API backend');
  server = 'default';
}

if (!appToBuild) {
  console.log('WARNING: Using "article-editor" as the app to build');
  appToBuild = 'article-editor';
}

// CSS
var sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css');

// JS
var webpack = require('webpack');
var path = require('path');

var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Deployment
var gls = require('gulp-live-server');

// Primary tasks (use these!)
gulp.task('run', ['init', 'watch', 'serve']);

// Different than build due to css & hash tasks slowing down development.
// Look into later --AB, 08/2015
gulp.task('init', ['js', 'sass', 'html', 'media', 'dummyMedia']);

gulp.task('build', ['jsProd', 'css', 'html', 'media', 'dummyMedia',
                    'publicJs']);

gulp.task('css', ['hash']);

gulp.task('test', function(){
  console.log(appToBuild)
});

// Creates livereload server at localhost:1337
gulp.task('serve', function() {
  var server = gls.static('dist', 1337);
  server.start();
  //use gulp.watch to trigger server. Note that this doesn't watch /src files, just /dist
  gulp.watch(['dist/**/css/*.css', 'dist/**/*.html', 'dist/**/js/index.js'], function () {
      server.notify.apply(server, arguments);
  });
});

// Watch tasks
gulp.task('watch', ['watchJS', 'watchSass', 'watchStatic']);

gulp.task('watchJS', function() {
  var appJS = './src/' + appToBuild + '/*.js';
  var appComponents = './src/' + appToBuild + '/components/**/*.{js,jsx}';
  var commonJS = '.src/common/**/*.js';
  var commonComponents = './src/common/components/**/*.{js,jsx}';
  var jsSrc = [appJS, appComponents, commonJS, commonComponents];

  gulp.watch(jsSrc, ['js']);
});

gulp.task('watchSass', function() {
  var appSass = 'src/' + appToBuild  + '/components/**/*.scss';
  var baseStyles = 'src/common/baseStyles/baseStyles.scss';
  var commonComponents = 'src/common/components/**/*.scss';
  var sassSrc = [appSass, baseStyles, commonComponents];
  if (appToBuild === 'sandbox') {
    var articleSass = 'src/article-editor/components/**/*.scss';
    var themeSass = 'src/theme-editor/components/**/*.scss';
    sassSrc = [appSass, baseStyles, commonComponents, articleSass, themeSass]
  }
  gulp.watch(sassSrc, ['sass']);
});

gulp.task('watchStatic', function() {
  var html = 'src/' + appToBuild + '/*.html';
  var appMedia = 'src/' + appToBuild + '/**/media/*.*';
  var commonMedia = 'src/common/**/media/*.*';
  var dummyMedia = 'src/' + appToBuild + '/**/dummy-media/*.*';
  var mediaSrc = [appMedia, commonMedia];

  gulp.watch(html, ['html']);
  gulp.watch(mediaSrc, ['media']);
  gulp.watch(dummyMedia, ['dummyMedia'])
});

// Sass compile for development NOTE: Does not like empty SCSS files.
gulp.task('sass', function () {
  var articleSass = 'src/article-editor/components/**/*.scss';
  var appSass = './src/' + appToBuild  + '/components/**/*.scss';
  var baseStyles = './src/common/baseStyles/baseStyles.scss';
  var commonComponents = './src/common/components/**/*.scss';
  var sassSrc = [appSass, baseStyles, commonComponents, articleSass];
  if (appToBuild === 'sandbox') {
    articleSass = 'src/article-editor/components/**/*.scss';
    var themeSass = 'src/theme-editor/components/**/*.scss';
    sassSrc = [appSass, baseStyles, commonComponents, articleSass, themeSass]
  }
  var stream = gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'));

  if (!dev) {
    stream = stream.pipe(minifyCSS({
      keepSpecialComments:0,
      processImport: true
    })).pipe(git());

  }
  stream = stream.pipe(concat('app.css'));

  return stream
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/' + appToBuild + '/css'));
});

// Sass compile for build. DO NOT REMOVE.
gulp.task('sassClean', ['clean'], function () {
  var articleSass = 'src/article-editor/components/**/*.scss';
  var appSass = './src/' + appToBuild  + '/components/**/*.scss';
  var baseStyles = './src/common/baseStyles/baseStyles.scss';
  var commonComponents = './src/common/components/**/*.scss';
  var sassSrc = [appSass, baseStyles, commonComponents, articleSass];
  if (appToBuild === 'sandbox') {
    articleSass = 'src/article-editor/components/**/*.scss';
    var themeSass = 'src/theme-editor/components/**/*.scss';
    sassSrc = [appSass, baseStyles, commonComponents, articleSass, themeSass]
  }
  var stream = gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'));

  if (!dev) {
    stream = stream.pipe(minifyCSS({
      keepSpecialComments:0,
      processImport: true
    })).pipe(git());

  }
  stream = stream.pipe(concat('app.css'));

  return stream
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/' + appToBuild + '/css'));
});


gulp.task('hash', ['sassClean'], function() {
  return gulp.src('./dist/' + appToBuild + '/css/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./dist/' + appToBuild + '/css'));
});

// HTML - Moves index file to dist
gulp.task('html', function() {
  return gulp.src('./src/' + appToBuild  + '/index.html')
    .pipe(gulpif(argv.prod, minifyHTML()))
    .pipe(gulp.dest('dist/'+ appToBuild));
});

// Media - moves all media files to dist
gulp.task('media', function() {
  var appMedia = './src/' + appToBuild + '/**/media/*';
  var commonMedia = './src/common/**/media/*.*';
  var mediaSrc = [appMedia, commonMedia];
  return gulp.src(mediaSrc)
    .pipe(gulpif(argv.prod, imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(flatten())
    .pipe(gulp.dest('dist/' + appToBuild + '/media'));
});
gulp.task('dummyMedia', function() {
  var appMedia = './src/' + appToBuild + '/**/dummy-media/*';
  return gulp.src(appMedia)
    .pipe(gulpif(argv.prod, imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(flatten())
    .pipe(gulp.dest('dist/' + appToBuild + '/dummy-media'));
});

gulp.task('clean', function() {
  return del([
    'dist/' + appToBuild
  ]);
});

gulp.task('cleanPublicJs', function() {
  return del([
    'dist/public/js/*'
  ]);
});

// JS transforms
var nodeModules = path.resolve(__dirname, 'node_modules');
var wpConfig = Immutable.fromJS({
  entry: {
    app: ['./config/' + server + '.js', './src/'+ appToBuild + '/index.js'],
    vendors: [
      'react',
      'immutable',
      'reflux'
    ]
  },
  resolve: {
    root: path.join(__dirname, 'js'),
    extensions: ['', '.js', '.jsx',],
    modulesDirectories: ['src', 'node_modules'],
  },
  devtool: 'cheap-eval-source-map',
  module: {
    loaders: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": [
          "es2015",
          "react"
        ],
        "plugins": [
          "syntax-class-properties",
          "syntax-decorators",
          "syntax-object-rest-spread",
          "transform-class-properties",
          "transform-decorators-legacy",
          "transform-object-rest-spread"
        ]
      }
    }, {
        test: /\.css?$/,
        loader: "style-loader!css-loader!postcss-loader",
        include: __dirname
     }]
  },
  output: {
    path: './dist/'+ appToBuild + '/js',
    publicPath: './dist/'+ appToBuild + '/',
    filename: 'index.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
});

var publicWpConfig = {
  entry: {
    app: [
      './config/' + server + '.js',
      './src/public/js/app.js'
    ],
    vendors: [
      'underscore',
      'baconjs',
      'jquery',
    ]
  },
  resolve: {
    root: path.join(__dirname, 'js'),
    extensions: ['', '.js', '.jsx',],
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
      exclude: [nodeModules],
      loaders: ['babel-loader']
    }]
  },
  output: {
    path: './dist/public/js',
    publicPath: './dist/public/',
    filename: 'app.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
        'drop_console': true,
        'dead_code': true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

gulp.task('js', function(callback) {
  // run webpack
  return webpack(wpConfig.toJS(), function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    callback();
  });
});

var wpConfigProd = wpConfig.toJS();
wpConfigProd.devtool = null;
wpConfigProd.plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false,
      'drop_console': true,
      'dead_code': true
    }
  }),
  new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
];

gulp.task('jsProd', function(callback) {
  // run webpack
  return webpack(wpConfigProd, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    callback();
  });
});

gulp.task('buildPublicJs', function(callback) {
  return webpack(publicWpConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    callback();
  });
});

gulp.task('analytics', function() {
  return gulp.src('./src/public/js/analytics.min.js')
    .pipe(gulp.dest('./dist/public/js/'));
});

gulp.task('hashPublicJs', ['cleanPublicJs', 'buildPublicJs', 'analytics'], function() {
  return gulp.src('./dist/public/js/*.js')
    .pipe(rev())
    .pipe(gulp.dest('./dist/public/js'));
});

gulp.task('publicJs', ['hashPublicJs'], function() {
  return del([
    './dist/public/js/analytics.min.js',
    './dist/public/js/app.js',
    './dist/public/js/vendors.js'
  ]);
});

