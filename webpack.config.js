// This config file is for development setup using
// webpack-dev-server.

var webpack = require('webpack');

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
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
