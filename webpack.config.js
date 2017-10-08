const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV || 'development'
const debug = env !== 'production'
const loader = ExtractTextPlugin.extract({
  loader: 'css-loader',
  fallbackLoader: 'to-string-loader'
})

var config = {
  devtool: debug ? 'cheap-eval-source-map' : 'source-map',
  entry: {
    'polyfills': path.join(__dirname, 'src/polyfills.ts'),
    'vendor': path.join(__dirname, 'src/vendor.ts'),
    'main': [path.join(__dirname, 'src/boot.ts')]
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
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, 'src/favicon.ico'),
      title: "Jackblog angular2.x版",
      template: path.join(__dirname, 'src/index.ejs'),  //模板文件
      inject: 'body',
      hash: false,     //为静态资源生成hash值
      minify: {        //压缩HTML文件
        removeComments: false,       //移除HTML中的注释
        collapseWhitespace: true     //删除空白符与换行符
      }
    }),
    new ExtractTextPlugin({ filename: '[hash:8].style.css', allChunks: true }),
    new LoaderOptionsPlugin({
      debug: debug,
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        }
      }
    }),
    //https://github.com/AngularClass/angular2-webpack-starter/issues/993
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      path.join(__dirname, 'src')
    ),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'src/CNAME'), to: path.join(__dirname, 'dist')
    }])
  ],
  module: {
    rules: [
      { enforce: 'pre', test: /\.ts$/, exclude: /node_modules/, use: ['tslint-loader'] },
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, use: ['source-map-loader'] },
      {
        test: /\.ts$/, use: [
          '@angularclass/hmr-loader?pretty=' + debug + '&prod=' + !debug,
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.css$/,
        loader: loader
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[hash:8].[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: { quality: "65-90", speed: 4 }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[hash:8].[name].[ext]'
          }
        }]
      },
      { test: /\.html$/, use: ['raw-loader'] }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css']
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}

if (debug) {
  config.plugins.push(
    new CheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
  config.devServer = {
    contentBase: path.join(__dirname, "src"),
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    inline: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }

} else {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
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