import Vue from 'vue'
import store from '@/store'

// 只在线上环境保存错误信息
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info, a) {
    // 这是一个hack写法
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      // console.log(err,vm,info,window.location.href)
      /* store.dispatch('addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })*/
      // console.error(err, info)
    }) 
  }
} else {
  // 开发环境
  Vue.config.errorHandler = function(err, vm, info, a) {
    // 这是一个hack写法
    Vue.nextTick(() => {
      alert('代码报错了详情查看控制台记录')
      console.error(err, vm, info, window.location.href)
    })
  }
}
