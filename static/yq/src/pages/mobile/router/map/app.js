import {
  AUTH_NAME
} from '@/store/types' // 权限名称
// 公共的功能页面路由
import layout2 from 'mobile/master/t1/page-in' // 二级路由模板页
const deposit = () =>
  import ( /* webpackChunkName: "commonh5deposit" */ 'mobile/views/money/deposit') // q存款
const redirect_deposit = (resolve) => resolve(require('mobile/views/common/redirect')) // APP验证跳转
export default [  
    // {
    //   path: "/redirectDeposit",
    //   name: "redirect_deposit",
    //   component: redirect_deposit,
    //   meta:{
    //     title: ""
    //   }
    // },
    {
    path: '/app',
    component: {template:"<router-view></router-view>"}, // 二级路由模板页
    meta: {
      auth: [AUTH_NAME.USER] // 需要会员
    },
    children: [
      // 存款页面
      {
        path: 'deposit',
        name: 'app_deposit',
        component: deposit,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '充值',
          noCache: true // 不缓存该组件
        }
      }
      ]
    }
  ]
