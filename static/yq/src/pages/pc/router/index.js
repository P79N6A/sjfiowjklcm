import Vue from 'vue'
import VueRouter from 'vue-router'
// 正常的展示型页面
import show from './map/show'
// 错误页面
import error from './map/error'
// 用户中心页面
import user from './map/user'
// 代理中心页面
import agent from './map/agent'
// 其他页面
import extend from './map/extend'
// 导入路由拦截器
import {
  BeforeEach,
  AfterEach
} from '@/util/permission'
// 挂载vue-router
Vue.use(VueRouter)
//定时器
let timer = null
// 返回顶部
let gotoTop = function () {
  let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
  currentPosition -= 10;
  if (currentPosition > 0) {
    window.scrollTo(0, currentPosition);
  } else {
    window.scrollTo(0, 0);
    clearInterval(timer);
    timer = null;
  }
}
// 配置路由
const router = new VueRouter({
  // 因为是多入口，路由规则:
  // 开发模式 用#hash模式
  // 线上环境 用/hash模式
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  'linkActiveClass': 'active',
  // 当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
  scrollBehavior(to, from, savedPosition) {
    clearInterval(timer)
    if (savedPosition) {
      return savedPosition // { x: 0, y: 0 }
    } else {
      timer = setInterval(gotoTop, 10);
      // return { x: 0, y: 0 }
    }
  },
  routes: [
    ...show,
    ...error,
    ...user,
    ...agent,
    ...extend
  ]
})
// 进入路由前拦截（权限判断等）
router.beforeEach(BeforeEach)
// 进入路由后钩子（分析插件在这里调用）
router.afterEach(AfterEach)
export default router
