'use strict'
// 打包时用到的一些工具库
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const header = require('../static/ajax/info/header.json')

// 引入是为了多入口
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PAGE_PATH = path.resolve(__dirname, '../src/pages')
const merge = require('webpack-merge')

// 多入口配置
exports.entries = function() {
  const entryFiles = glob.sync(`${PAGE_PATH}/*/*.js`)
  const map = {}
  entryFiles.forEach((filePath) => {
    // 遍历入口文件
    const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    // 使用bable-plyfill，把代码转换成es2015
    map[filename] = ['babel-polyfill', filePath]
  })
  return map
}

// 多页面输出配置
exports.htmlPlugin = function() {
  const entryHtml = glob.sync(`${PAGE_PATH}/*/*.html`)
  const arr = []
  entryHtml.forEach((filePath) => {
    // 遍历html输出文件
    const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))

    let conf = {
      header: header,
      test: 'test',
      template: filePath,
      filename: `${filename}/index.html`,
      chunks: [filename],
      favicon: path.resolve('favicon.ico'), //新增
    }
    if (filename === 'pc') {
      conf.filename = 'index.html'
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        inject: true, // 把模版注入到body标签后
        chunks: ['manifest', 'vendor', filename],
        minify: {
          removeComments: true, // 删除注释
          collapseWhitespace: true, // 删除空格
          removeAttributeQuotes: true // 删除各种html标签属性值的双引号
        },
        // 注入依赖的时候按照依赖先后顺序进行注入，比如，需要先注入vendor.js，再注入app.j
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: '代码错误',
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.ico')
    })
  }
}
