var path = require('path')
var nib = require('nib')
var jeet = require('jeet')
var rupture = require('rupture')

module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename:'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {presets:['es2015', 'react']}}
    ]
  },
  stylus: {
    use: [nib(), jeet(), rupture()]
  }
};
