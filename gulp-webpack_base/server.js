var express = require('express')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpack = require('webpack')
var config = require('./webpack.dev.config.js')
var path = require('path')
var app = express()

for (var key in config.entry) {
  var entry = config.entry[key]
  entry.unshift('./client.js')
}

// config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.unshift(new webpack.optimize.OccurenceOrderPlugin())
config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
config.plugins.unshift(new webpack.NoErrorsPlugin())

var compiler = webpack(config)

var devMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = webpackHotMiddleware(compiler)

// hotMiddleware.subscribe(function (reload) {
//   window.location.reload()
// })

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  console.log(233)
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    // console.log(hotMiddleware.publish)
    hotMiddleware.publish({ action: 'reload' })
    // console.log(hotMiddleware)
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.listen(8080, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8080')
})