
require('pc/assets/scss/animation.scss') // 引入全局样式
require('pc/assets/scss/index.scss') // 引入全局样式

import Vue from 'vue' // 引入vue
import App from './App.vue' // 引入，挂载模板
import store from '@/store' // 加载状态管理器
import router from './router' // 加载路由器

import dom from '@/util/dom.js' // 加载原型方法
import prototype from '@/util/prototype' // 加载原型扩展
import components from 'pc/base/index.js' // 装载公共组件(toast,alert,confirm...可在这里配置)

// 外部扩展打包详情 https://webpack.docschina.org/configuration/externals/
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'

import Element from 'element-ui' // 目前仅在pc端部分使用，请使用外部打包
import 'element-ui/lib/theme-chalk/index.css' // // 目前仅在pc端部分使用，请使用外部打包
// import i18n from '@/lang' // Internationalization // 多语言，暂时没用到
// import locale from 'element-ui/lib/locale/lang/en' // 多语言，暂时没用到

import * as filters from '@/filters' // 引入全局过滤器
import VueClipboard from 'vue-clipboard2' // 复制插件，考虑移除
import VueLazyload from 'vue-lazyload' // 图片懒加载
// Vue.use(iView)
// 二维码
import VueQr from 'vue-qr'
Vue.component('VueQr', VueQr)
require("./assets/scss/base.scss")
require("./assets/scss/font.scss")
require("./assets/scss/animate.scss")

// banner轮播插件

import VueAwesomeSwiper from 'vue-awesome-swiper' // banner插件
import 'swiper/dist/css/swiper.css' // （如果你使用的是2.6.0以上的版本要自己手动去加载css)

// 注册移动端banner组件
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 注册复制插件
Vue.use(VueClipboard)
// 注册图片懒加载插件
// * 如果引用的是本项目的依赖图片 v-lazy="require(url)"
// * 正常使用 v-lazy="url"
Vue.use(VueLazyload, {
  preLoad: 1, // 预加载图片宽高比例
  attempt: 2, // 失败尝试次数
  filter: {
    // 设置支持webp图片，减少带宽压力，加快预览速度
    webp(listener, options) {
      // 确认平台支持webp
      if (!options.supportWebp) return
      // 目前仅游戏大厅的图片托管在7牛CDN
      const isCDN = /staticsources.com\/images/
      if (isCDN.test(listener.src)) {
        // 图片更改为webp，
        listener.src += '?imageView2/2/format/webp'
      }
    }
  },
  adapter:{
    error(listender,Init){
      listender.src = listender.src.replace(/www.staticsources.com/g,"qiniuyunback.staticesources.com")
    }
  }
})
// 注册element组件
Vue.use(Element, {
  size: 'medium' // set element-ui default size
  // locale: 'zh',
  // i18n: (key, value) => i18n.t(key, value)
})
// 生产环境提示关闭
Vue.config.productionTip = false
// 注册事件总线
Vue.prototype.$bus = new Vue()
const vm = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
export default vm

