// mobile公共样式
import flexible from '@/util/flexible' // flexible布局方案
require('mobile/assets/scss/index.scss')
import Vue from 'vue' // 引入vue
import App from './App.vue' // 引入app.vue
import router from './router' // 加载路由器
import store from '@/store' // 加载状态管理器

import prototype from '@/util/prototype' // 加载原型方法
import dom from '@/util/dom.js' // 加载原型方法
import base from 'mobile/base/index.js' // 装载公共方法
import component from 'mobile/vue-extend/component' // 注册全局组件

import * as filters from '@/filters' // 加载全局过滤器
import fastclick from 'fastclick' // 点击穿透
// 这部分准备移到对应的页面去
import VueAwesomeSwiper from 'vue-awesome-swiper' // banner插件
import 'swiper/dist/css/swiper.css' // （如果你使用的是2.6.0以上的版本要自己手动去加载css)
import VueClipboard from 'vue-clipboard2'
import VueLazyload from 'vue-lazyload'

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

fastclick.attach(document.body)

// 注册移动端banner组件
Vue.use(VueAwesomeSwiper)

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
