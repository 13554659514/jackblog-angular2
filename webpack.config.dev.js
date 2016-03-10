var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  debug:true,
  entry: { 'vendor': ['./src/vendor.ts'], 'main': ['./src/boot.ts'] },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
    new HtmlWebpackPlugin({ 
      title: "JackHu's blog",
      template: 'src/index.ejs',
      inject: true,
      baseUrl:'/'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'HMR': true
      }
    }),
    new ExtractTextPlugin('[hash:8].style.css', { allChunks: true })
  ],
  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint-loader', exclude: [ /node_modules/ ] },
      { test: /\.js$/, loader: "source-map-loader", exclude: [ /node_modules\/rxjs/ ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'url?limit=10000&name=images/[hash:8].[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'},
      { test: /\.html$/, loader: 'raw'}
    ],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
  },
  resolve: {
    extensions: ['', '.ts', '.async.ts', '.js', '.scss', '.css']
  },
  tslint: {
    emitErrors: false,
    failOnHint: false
  },
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
}

