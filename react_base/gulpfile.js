var gulp = require('gulp')
var webpack = require('webpack')
var config = require('./webpack.config.js')
var devConfig = require('./webpack.dev.config.js')
var gutil = require('gulp-util')
var webpackHotMiddleware =  require('webpack-hot-middleware')
var webpackDevMiddleware =  require('webpack-dev-middleware')
var mockMiddleware = require('./mock-middleware.js')
var express = require('express')
var app = express()
var url = require('url')
var proxy = require('proxy-middleware')

gulp.task('webpack', function (cb) {
  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false
    }))

    cb()
  })
})

gulp.task('build', ['webpack'])

gulp.task('server:init', function () {
  for (var key in devConfig.entry) {
    var entry = devConfig.entry[key]
    entry.unshift('./client.js')
  }

  devConfig.plugins.unshift(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )

  var compiler = webpack(devConfig)
  var devMiddleware = webpackDevMiddleware(compiler, {
    hot: true,
    stats: {
      colors: true,
      chunks: false
    }
  })

  var hotMiddleware = webpackHotMiddleware(compiler)

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, callback) {
      hotMiddleware.publish({ action: 'reload' })
      callback()
    })
  })

  app.use('/api/:method', mockMiddleware)
  // app.use(proxy(url.parse('http://tx2.biz.lizhi.fm')))

  app.use(devMiddleware)
  app.use(hotMiddleware)
})

gulp.task('server', ['server:init'], function () {
  app.use('/', function (req, res) {
    res.send('hello, world!')
  })

  app.listen(8080, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('listening at http://localhost:8080')
  })
})