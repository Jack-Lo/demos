var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: ['./src/js/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist/static'),
    // publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.swig']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.swig$/,
        loader: 'swig'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: './index.html',
      template: './src/tpl/index',
      inject: true
    })
  ]
}
