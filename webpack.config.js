const pkg = require('./package.json');
const path = require('path');


module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    index: './index.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    library: pkg.name,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
    ],
  },
};
