const webpack = require('webpack');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const postcssVars = require('postcss-simple-vars');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCalc = require('postcss-calc');

const postcss = [
  postcssImport(),
  postcssCustomProperties(),
  postcssCalc(),
  postcssNext({
    browsers: ['last 2 versions'],
  }),
  postcssNested(),
  postcssVars()
];

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pcss$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => postcss
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|woff|woff(2)|eot|ttf|svg|otf)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [],
  watch: true,
  devtool: 'inline-source-map'
};
