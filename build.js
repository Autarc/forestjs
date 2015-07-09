/**
 * Build
 * =====
 *
 *
 */

const path = require('path')

const webpack = require('webpack')
const merge = require('deep-merge')(function (target, source) {
  if (target instanceof Array) {
    return [].concat(target, source)
  }
  return source
})

const manifest = require('./package.json')

// environment mode: development (default) - release
const isProduction = (process.env.NODE_ENV === 'production') || process.argv.length > 2

const inputFile =  __dirname + '/src/index.js'

const distDir = path.dirname(manifest.main) // dist
const exportName = path.basename(manifest.main, path.extname(manifest.main))


// Default - generic settings
var config = {
  entry: inputFile,
  // - currently node focused
  target: 'node',
  output: {
    library: exportName,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          optional: [
            // http://babeljs.io/blog/2015/05/14/function-bind/
            // https://github.com/zenparsing/es-function-bind
            'es7.functionBind'
          ]
        }
      }
    ],
  },
}

// build + watch
if (!isProduction) {
  var development = merge(config, {
    devtool: 'sourcemap',
    debug: true,
    output: {
      path: distDir,
      filename: exportName + '.js'
    },
    plugins: [
      // adds sourcemap support for nodejs
      new webpack.BannerPlugin('require("source-map-support").install();',
                                { raw: true, entryOnly: false })
    ]
  })
  return webpack(development).watch(100, function (err, stats) {
    console.log('[BUILD] - ', stats.toString())
  })
}

// optimize
var production = merge(config, {
  devtool: 'sourcemap',
  debug: true,
  output: {
    path: distDir,
    filename: exportName + '.min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      sourceMap: false
    })
  ]
})

webpack(production).run(function (err, stats) {
  console.log('[BUILD] - ', stats.toString())
})
