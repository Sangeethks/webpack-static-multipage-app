const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/scripts/app.js',
    projects: './src/scripts/projects.js',
    vendor: Object.keys(package.dependencies)
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test:/\.(s*)css$/,
      use: ExtractTextPlugin.extract({
        fallback:'style-loader',
        use:['css-loader','sass-loader'],
      })
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader:'file-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  resolve: {
    extensions: [ '.js', '.html' ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist/"),
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: [ 'vendor', 'shared', 'app' ],
      path: path.join(__dirname, "../dist/")
    }),
    new HtmlWebpackPlugin({
      filename: 'projects.html',
      template: './src/projects.html',
      chunks: [ 'vendor', 'shared', 'projects' ],
      path: path.join(__dirname, "../dist/")
    }),
    new ExtractTextPlugin({filename:'app.bundle.css'}),
    new CommonsChunkPlugin({
      name: 'shared',
      minChunks: 2
    }),
  ]
}
