const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const port = process.env.PORT || 8000;
const dev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: ['webpack-hot-middleware/client', path.resolve(__dirname, 'src/index.js')],

  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public'),
  },

  stats: {
    colors: true,
    reasons: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${port}/` }),
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-2'],
      },
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          query: {
            sourceMap: dev
          }
        },
      ],
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'react-svg-loader',
        options: {
          jsx: true, // true outputs JSX tags
        },
      }],
    }],
  },
};

if (dev) {
  module.exports.cache = true
  module.exports.devtool = 'source-map';
} else {
  module.exports.plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 8
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
  );
}
