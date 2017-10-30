const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: path.resolve('src'),
  entry: {
    index: './index.js',
    validate: './validate.js',
    util: './util.js',
    Signal: './Signal.js',
  },
  output: {
    path: path.resolve('lib'),
    filename: '[name].js',
    chunkFilename: '[name].min.js',
    library: 'milkmidi',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: [
      'node_modules',
      'src/',
    ],
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
};
