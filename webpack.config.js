var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    app: [
      './source/javascripts/app.js',
      './source/stylesheets/app.scss'
    ]
  },

  output: {
    path: './build',
    filename: 'javascripts/[name].js'
  },

  module: {
    loaders: [

      // JS
      { test: /source\/javascripts\/.*\.js$/, exclude: /(node_modules|build)/, loader: 'babel-loader', query: {presets: ['es2015', 'stage-0']}},

      // SCSS
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!sass")},
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize") },
    ],
  },

  resolve: {
      // you can now require('file') instead of require('file.react.jsx')
      extensions: ['', '.js', '.json', '.jsx'] 
    },

  plugins: [

    // CSS output file
    new ExtractTextPlugin("stylesheets/app.css", {allChunks: true}),

    // Make React object globally available
    new webpack.ProvidePlugin({React: "react"})
  ],

};