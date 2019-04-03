'use strict'

const path = require('path')
const ifaces = require('os').networkInterfaces();
/**
 * 获取当前计算机基于局域网的位置，方便局域网内其他人访问
 */
function getIp() {
  return [].concat.apply([], Object.values(ifaces))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .shift().address;
}
module.exports = {
  // 开发环境
  dev: {
    // 相关路径
    // 项目打包后的静态资源目录 除了index.html，其余的js img css都分在这里
    assetsSubDirectory: 'static',
    // 以当前根目录为项目目录，访问static/js/app.js
    assetsPublicPath: '/',
    // 开发环境相关配置
    // 本地反向代理并转发ajax，解决开发时，浏览器接口跨域访问的问题
    proxyTable: {
      // 配置接口代理规则
      // 因为目前到项目基本都时.php后缀
      '**/*.php': {
        // 这里配置反向代理域名，将地址更换为接口服务器所在到域名地址即可
        target: 'http://zytest.itgo88.com/',
        // target: 'https://www.qhc116.com',
        changeOrigin: true
      }
    },
    // 开启本地服务器时的ip地址
    host: getIp() || 'localhost',
    // 访问端口，可以通过 process.env.PORT来配置, 如果该端口被占用，会自动使用一个新的
    port: 9527,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 打印错误
    errorOverlay: true,
    // 调用系统原生到信息提示
    notifyOnErrors: true,
    // 系统提示错误信息
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // 是否启用Eslint格式检查工具
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    // 是否把开发时到错误打印在浏览器的console中
    showEslintErrorsInOverlay: true,
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: '#cheap-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true, // 打破缓存

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false // 是否生成css sourcemap
  },
  // 线上环境打包配置
  build: {
    // html模版文件 index.html
    // 目前我们是多入口，该参数已经不起作用
    index: path.resolve(__dirname, '../dist/index.html'),
    // 路径配置
    // 打包后到文件，存放位置
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 资源子目录 除了index.html，其余的js img css都分在这里
    assetsSubDirectory: 'static',
    // 以当前根目录为项目目录，访问/static/js/app.js
    // 如果静态资源要配置到cdn，修改这里即可
    assetsPublicPath: '/',

    /**
     * Source Maps // 关闭后，线上无法用vue-tool调试，安全
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否启用gzip压缩
    productionGzipExtensions: ['js', 'css'], // gzip压缩的文件后缀类型

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 是否查看打包分析
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
