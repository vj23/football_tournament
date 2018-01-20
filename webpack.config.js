var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  //devtool: 'source-map',
  entry: [
   
   './src/com/coverfox/demoComponent/index.js'],
 
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),
    publicPath: '/public'
  },

   /*  resolve: {
     modules: ['src', 'node_modules'],
    // allows you to require without the .js at end of filenames
    // import Component from 'component' vs. import Component from 'component.js'
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }, */

  
  module: {
    
    loaders: [
     
      
    /*  { test: /\.js$/, loaders: ['babel-loader'] ,  exclude: /node_modules/}, */
     
 
        
    ]
  },

};
