const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

const env = process.env.NODE_ENV || 'development'
const debug = env !== 'production'

var config = {
  devtool: debug?'eval-source-map':'source-map',
  debug:debug,
  entry: {
    'polyfills': path.join(__dirname,'src/polyfills.ts'),
    'vendor': path.join(__dirname,'src/vendor.ts'),
    'main': [path.join(__dirname,'src/boot.ts')]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env),
        'HMR': debug ? true : false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new HtmlWebpackPlugin({ 
      favicon:path.join(__dirname,'src/favicon.ico'),
      title: "Jackblog angular2.x版",
      template: path.join(__dirname,'src/index.ejs'),  //模板文件
      inject:'body',
      hash:false,     //为静态资源生成hash值
      minify:{        //压缩HTML文件
        removeComments:false,       //移除HTML中的注释
        collapseWhitespace:true     //删除空白符与换行符
      }
    }),
    new ExtractTextPlugin('[hash:8].style.css', { allChunks: true })
  ],
  module:{
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint-loader', exclude: [ /node_modules/ ] },
      { test: /\.js$/, loader: "source-map-loader", exclude: [ /node_modules\/rxjs/ ] }
    ],
    loaders: [
      { 
        test: /\.ts$/, loaders: [
          '@angularclass/hmr-loader?pretty=' + debug + '&prod=' + !debug,
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ], 
        exclude: [ /\.(spec|e2e)\.ts$/ ] 
      },
      { 
        test: /\.css$/, loaders: [
           'to-string-loader',
           ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') 
        ] 
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'url?limit=10000&name=images/[hash:8].[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'},
      { test: /\.html$/, loader: 'raw'}
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.scss', '.css']
  },
  tslint: {
    emitErrors: false,
    failOnHint: false
  },
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
}

if(debug){
  config.plugins.push(
    new ForkCheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}else{
  config.plugins.push(new UglifyJsPlugin({
    beautify: false, //prod
    output: {
      comments: false
    }, //prod
    mangle: {
      screw_ie8: true
    }, //prod
    compress: {
      screw_ie8: true,
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false // we need this for lazy v8
    }
  }))
}

module.exports = config