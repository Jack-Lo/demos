var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: ['./src/js/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist/static'),
    publicPath: 'static/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.swig']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        // loader: 'style!css'
        loader: ExtractTextPlugin.extract('style', ['css'])
      },
      {
        test: /\.scss$/,
        // loader: 'style!css!sass'
        loader: ExtractTextPlugin.extract('style', ['css', 'sass'])
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
      filename: '../index.html',
      template: './src/tpl/index',
      inject: true
    }),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ]
}
