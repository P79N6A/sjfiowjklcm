import store from '@/store' // 加载状态管理器
import { pageview } from '@/util/analytics'
/**
 * 路由权限规则如下
 * if（需要登录）{
 * 是否需要拉去用户信息，
 * 根据用户信息判断对应页的权限
 *
 * }else if（需要非登录状态）{
 *
 * 是否已经登录
 *
 * }
 *else{
 *  直接进入
 * }
 *
 */

export const BeforeEach = (to, from, next) => {
  // 比对当前所需要的权限
  // 登录状态不允许进入，（登录页面）
  if (to.meta.needFalseLogin) {
    if (store.getters.islogin) {
      // 已登录
      // 退回到from
      next({
        path: from.path
      })
    } else {
      next()
    }
  } else if (to.meta.auth && to.meta.auth.length > 0) {
    // 需要登录状态
    if (!store.getters.islogin) {
      // 没有登录状态去获取用户信息一次
      store.dispatch('UPDATE_USERDATA').then(res => {
        if (res.success) {
          const { role } = res.data
          if (to.meta.auth.indexOf(role) >= 0) {
            // 有权限直接进
            next()
          } else {
            // 未知权限,返回from 的地址
            window.toast('无权限进入')
            next({
              path: from.path
            })
          }
          // 设置权限
        } else {
          // 登录失败
          // 清空用户数据
          store.dispatch('INIT_INFO')
          // 退回到from
          next({
            path: from.path
          })
        }
      }).catch((err) => {
        window.toast(err.message)
        store.dispatch('INIT_INFO') // 报错清空登录
        next('/')
      })
    } else {
      // 有登录状态
      // 判断是否有权限
      const hasAuth = store.getters.authList.findIndex(item => to.meta.auth.includes(item))
      if (hasAuth>-1) {
        // 有权限
        next()
      } else { 
        // 无权限，返回from的地址
        window.toast('无权限进入')
        next({
          path: from.path
        })
      }
    }
  } else {
    // 不需要权限，直接进入
    next()
  }
}

export const AfterEach = (to, from, next) => {
  // 统计代码
  // _hmt.push(['_trackPageview', pageURL]) 必须是以"/"（斜杠）开头的相对路径
  if (to.path) {
    pageview(to.path)
  }
}
