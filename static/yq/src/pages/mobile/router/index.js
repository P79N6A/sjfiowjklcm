import Vue from 'vue'
import VueRouter from 'vue-router'
import show from './map/show'
import user from './map/user'
import agent from './map/agent'
import common from './map/common'
import error from './map/error'
import extend from './map/extend'
import { BeforeEach, AfterEach } from '@/util/permission'

Vue.use(VueRouter)

const router = new VueRouter({
  // 因为是多入口，路由规则:
  // 开发模式 用#hash模式
  // 线上环境 用/hash模式
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  base: '/mobile/',
  'linkActiveClass': 'active',
  // 当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // { x: 0, y: 0 }
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    ...show,
    ...user,
    ...agent,
    ...common,
    ...extend,
    ...error
  ]
})
// 配置路由钩子
// 进入路由前拦截（权限判断等）
router.beforeEach(BeforeEach)
// 进入路由后钩子（分析插件在这里调用）
router.afterEach(AfterEach)
export default router
