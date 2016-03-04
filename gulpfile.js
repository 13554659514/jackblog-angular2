var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var WebpackDevServer = require("webpack-dev-server")
var webpack = require("webpack")
var del = require('del')
var env = require('gulp-env')
var gulpSequence = require('gulp-sequence')
var nodemon = require('gulp-nodemon')
var open = require('open')

var DEV_PORT = 5300,PROD_PORT = 8500
gulp.task('serve', function ()  {
  var devConfig = require('./webpack.config')
  devConfig.entry.main.unshift('webpack-dev-server/client?http://localhost:' + DEV_PORT, 'webpack/hot/only-dev-server')
  new WebpackDevServer(webpack(devConfig), {
      noInfo: false,
      hot: true,
      inline: true,
      historyApiFallback: true,
      publicPath: devConfig.output.publicPath,
      stats: {
        colors: true
      },
      watchOptions: { aggregateTimeout: 300, poll: 1000 }
  }).listen(DEV_PORT, "localhost", (err,stat) => {
      if(err) throw new gutil.PluginError("webpack-dev-server", err)
      gutil.log("[webpack-dev-server]", "==> 🌎  http://localhost:" + DEV_PORT)
      open('http://localhost:' + DEV_PORT)
  });
})

gulp.task('clean', function () {
  del([path.join(__dirname, '/dist/*')])
})

gulp.task('set-env-prod', function () {
  env({
    vars: {
      'NODE_ENV':'production'
    }
  })
})

gulp.task('webpack', function (cb) {
  var prodConfig = require('./webpack.config')
  webpack(prodConfig, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err)
      gutil.log("[webpack]", stats.toString({
          // output options
      }))
      cb()
  })
})

gulp.task('webpack:dist',gulpSequence('set-env-prod','webpack'))

gulp.task('build', gulpSequence('clean','webpack:dist'))

gulp.task('nodemon', function () {
  nodemon({
    script: path.join(__dirname,'/server.js'), 
    ext: 'js',
    watch: [
      path.join(__dirname,'/dist')
    ],
    env: { 'NODE_ENV': 'production','PORT':PROD_PORT }
  })
})

gulp.task('serve:dist',gulpSequence('build','nodemon'))