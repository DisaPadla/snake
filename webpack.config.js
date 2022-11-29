const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  entry: path.join(cwd, 'src/index.js'),
  output: {
    path: path.join(cwd, 'dist'),
    filename: 'bundle.[hash].js',
  },
  mode: 'development',
  devServer: {
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'static/index.html',
    }),
  ],
};