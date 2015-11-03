// This config file is for development setup using
// webpack-dev-server.

var vue = require('vue-loader');

module.exports = {
  entry: {
    example: './examples/index.js',
    test: './test/index.js'
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: vue.withLoaders({
          // apply babel transform to all javascript
          // inside *.vue files.
          js: 'babel?optional[]=runtime&loose=all'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(ttf|svg|woff2|woff|eot)$/,
        loader: 'url?limit=100&name=[path][name].[hash:6].[ext]'
      }
    ]
  },
  devtool: '#source-map'
};
