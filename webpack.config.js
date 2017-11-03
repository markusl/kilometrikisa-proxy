
const slsw = require('serverless-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: 'babel-loader',
      include: __dirname,
      exclude: /node_modules/
    }],
  },
  plugins: [
    //new UglifyJSPlugin(),
  ],
};
