const path = require('path');
const {NODE_ENV = 'production'} = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
