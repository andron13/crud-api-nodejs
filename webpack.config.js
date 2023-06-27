const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Имя файла сборки
  },
};
