const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: '/script.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'gem-puzzle',
    }),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "./assets" }
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: 'gem-puzzle',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
};