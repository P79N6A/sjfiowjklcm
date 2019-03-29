import {
  AUTH_NAME
} from '@/store/types' // 权限名称
// import Layout from 'mobile/master/t1/show' // 基础外框

// 公共的功能页面路由
const deposit = () =>
  import ( /* webpackChunkName: "commonh5deposit" */ 'mobile/views/money/deposit') // q存款
export default [{
  path: '/deposit',
  component: deposit, // 二级路由模板页
  // redirect: '/deposit/index',
  name:'deposit',
  meta: {
    // auth: [AUTH_NAME.USER] // 需要会员
  },
  // children: [
  //   // 存款页面
  //   {
  //     path: '/index',
  //     name: 'money_deposit',
  //     component: deposit,
  //     meta: {
  //       auth: [AUTH_NAME.USER],
  //       headName: '充值',
  //       noCache: true // 不缓存该组件
  //     }
  //   }]
  }]
