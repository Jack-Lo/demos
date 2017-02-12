var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: ['./src/js/App.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist/static'),
    // publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.swig']
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
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /bower_components/],
        // loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url'
      },
      {
        test: /\.(eot|woff|ttf|woff2)$/,
        loader: 'url'
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
