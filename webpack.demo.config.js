var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './demo/main.js'
  ],
  output: {
    filename: 'demo/compiled.js'
  },
  plugins: [],
  resolve: {
    extensions: [ '', '.js', '.json' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'stage-2' ]
        },
        exclude: /node_modules/
      }
    ]
  }
}
