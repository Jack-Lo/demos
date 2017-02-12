var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: ['./src/js/App.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist/static'),
    publicPath: 'static/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.swig']
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
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /bower_components/],
        // loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|woff|ttf|woff2)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
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
