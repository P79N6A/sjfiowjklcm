import {
  AUTH_NAME
} from '@/store/types' // 权限名称
import Layout2 from 'mobile/master/t1/page-in' // 带返回操作的外框
const sport = () => import(/* webpackChunkName: "showh5sport" */'mobile/views/extend/sport')// 体育
const chessHall = () => import(/* webpackChunkName: "showh5chessHall" */'mobile/views/extend/chessHall')// 体育

const depositMenu = () => import(/* webpackChunkName: "commonh5depositMenu" */'mobile/views/extend/depositMenu')// 存款页面菜单
export default [
   {
     path: '/sport',
     component: sport,
     name:'sport',
     meta: {
       noCache: true, // 是否不缓存改组件,
       meta: {
         title: '沙巴体育'
       }
     }
   },
  // 存款页面菜单
  {
    path: '/depositMenu',
    name: 'money_depositMenu',
    component: depositMenu,
    meta: {
      auth: [AUTH_NAME.USER],
      noCache: true, // 不缓存该组件
      headName: '充值'
    }
  },
  // 棋牌游戏大厅
  {
    path: '/chessHall',
    component: Layout2,
    children: [{
      path: '/',
      name: 'chessHallindex',
      redirect: '/chessHall/index'
    },
    {
      path: 'index/:type?',
      component: chessHall,
      name: 'chessHall',
      meta: {
        noCache: true, // 是否不缓存改组件,
        title: '棋牌游戏'
      }
    }
    ]
  },
]
