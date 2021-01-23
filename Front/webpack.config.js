const resolve = require('path').resolve;

module.exports = {
  entry: './src/index.js',
  output: {
    // seperated path and filename of generated output
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve : {
    fallback: 
      { "path": false,
        "zlib": false,
        "crypto": false }

  },
  module: {
    rules: [{
      test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime', "styled-jsx/babel"]

          }
        }]
      }]
    }
  
};