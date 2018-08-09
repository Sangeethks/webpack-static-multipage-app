const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  entry: {
    app: './src/scripts/app.js',
    projects: './src/scripts/projects.js',
    vendor: Object.keys(package.dependencies)
  },
  output: {
    filename: './dist/[name].[hash].js'
  },
  watch: true,
  resolve: {
    extensions: [ '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './dist/index.html',
      template: './src/index.html',
      chunks: [ 'vendor', 'shared', 'app' ]
    }),
    new HtmlWebpackPlugin({
      filename: './dist/projects.html',
      template: './src/projects.html',
      chunks: [ 'vendor', 'shared', 'projects' ]
    }),
    new CommonsChunkPlugin({
      name: 'shared',
      minChunks: 2
    }),
  ]
}
