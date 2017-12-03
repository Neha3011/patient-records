const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + (path.resolve('./node_modules'))
];

const config = {
  'devtool': 'source-map',
  'entry': [
    './src/index.js'
  ],
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'react-hot-loader/webpack'
    }, {
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loaders': 'babel-loader'
    }, {
      'test': /\.(scss|css)$/,
      'loader': ExtractTextPlugin.extract({
        'fallback': 'style-loader',
        'use': sassLoaders.join('!')
      })
    }, {
      'test': /\.(jpe?g|png|gif|svg)$/i,
      'loaders': [
        'file-loader?name=images/[name].[hash].[ext]',
        {
          'loader': 'image-webpack-loader',
          'query': {
            'gifiscle': {
              'interlaced': false
            },
            'optipng': {
              'optimizationLevel': 7
            },
            'bypassOnDebug': true
          }
        }
      ]
    }]
  },
  'resolve': {
    'extensions': ['.js', '.sass'],
    'alias': {
      'immutable': path.resolve(__dirname, 'node_modules/immutable')
    }
  },
  'output': {
    'path': path.resolve(__dirname, './dist'),
    'filename': 'scripts/bundle.js'
  },
  'devServer': {
    'contentBase': './dist',
    'historyApiFallback': true,
    'hot': true,
    'disableHostCheck': true
  },
  'plugins': [
    new HtmlWebpackPlugin({
      'template': './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles/bundle.css')
  ]
};

module.exports = config;
