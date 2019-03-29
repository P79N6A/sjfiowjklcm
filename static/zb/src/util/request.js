import axios from 'axios' // 引入axios
import store from '@/store' // 加载状态管理器
import vueRouter from 'pc/router' // 引入vue
import { Message } from 'element-ui' // Message,Loading
const qs = require('qs')

// 设置头部信息,设置为formData形式提交
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.responseType = 'json'
axios.defaults.timeout = 0
// axios.defaults.withCredentials=true;
const ajaxList={}
const get = axios.get
axios.get = function(url, data, config) {
  return get(url, Object.assign({
    params: data || {}
  }, config || {}))
}

// 发送请求前的拦截
axios.interceptors.request.use(function(config) {
  config.data = qs.stringify(config.data)
  return config
}, function(error) {
  console.log('发送请求失败:' + error)
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use((response) => {
  // 接口正常返回
  $load.close()
  // 没有返回data
  if (response.status === 200 && response.data == undefined) {
    // 接口可能把值放在request.response里
    const olddata = response.request.responseText || response.request.response
    // 针对可能返回字符串的情况
    if (typeof olddata === 'string') {
      try {
        response.data = JSON.parse(olddata)
      } catch (e) {
        // 返回该字符串
        response.data = {
          message: olddata,
          olddata: olddata,
          success: false
        }
      }
    } else {
      // 直接返回
      response.data = olddata
    }
  }
  // 没有success状态
  if (!response.data.hasOwnProperty('success')) {
    response.data.success = response.data.code == '10000'
  }
  // 40001， 登录过期
  if (response.status === 200 && /40001/.test(response.data.code)) {
    // 弹出提示
    // Toast(response.data.message)
    // 初始化用户信息
    // window.reload()
    store.dispatch('INIT_INFO')
    // 返回首页
    // location.reload()
    // vueRouter.push({
      // path: '/'
    // })
  }
  // 返回ajax的内容

  return response.status === 200 ? response.data : response
},
(err) => {
  console.log('=========')
  console.log(err)
  // 接口报错
  $load.close()
  // 获取错误信息
  if (err && err.response) {
    switch (err.response.status) {
      // 根据错位信息，是否要跳转到对应的错误页,错误页面，PC/MOBILE/APP共用
      case 500:
        window.location.href='/static/page/error/500.html'
        // vueRouter.replace({
        // path: '/500'
        // })
        break
      // case 404:
      //   window.location.href='/static/page/error/404.html'
      //   // vueRouter.replace({
      //   // path: '/404'
      //   // })
      //   break
      case 403:
        window.location.href='/static/page/error/403.html'
        // vueRouter.replace({
        // path: '/403'
        // })
        break
    }
  }
  return Promise.reject(err)
}
)
window.$ajax = axios
export default axios
