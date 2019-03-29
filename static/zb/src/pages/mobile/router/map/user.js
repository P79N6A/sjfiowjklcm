import { AUTH_NAME } from '@/store/types'

import Layout from 'mobile/master/t1/show' // 基础外框
import Layout2 from 'mobile/master/t1/page-in' // 带返回操作的外框
import Layout3 from 'mobile/master/t1/page-foot'  //去掉顶部的 留有底部
import Layout4 from 'mobile/master/t1/page-nothing'  //去掉头部和底部

const index = () => import(/* webpackChunkName: "userh5index" */'mobile/views/user/index/index')

const log = () => import(/* webpackChunkName: "userh5log" */'mobile/views/user/log')// 记录消息
const log_details = () => import(/* webpackChunkName: "userh5log" */'mobile/views/user/log/components/log-details.vue')// 记录详情
const save_send = () => import(/* webpackChunkName: "userh5savesend" */'mobile/views/user/save-send')
const wash_code = () => import(/* webpackChunkName: "userh5washcode" */'mobile/views/user/wash-code')
const discount_code = () => import(/* webpackChunkName: "userh5discount" */'mobile/views/user/discount-code')
const red_envelope = () => import(/* webpackChunkName: "userh5discount" */'mobile/views/user/red-envelope')
const help_gold = () => import(/* webpackChunkName: "userh5helpgold" */'mobile/views/user/help-gold')
const vip_gold = () => import(/* webpackChunkName: "userh5vip" */'mobile/views/user/vip-gold')
const birthday_gold = () => import(/* webpackChunkName: "userh5birthday" */'mobile/views/user/birthday-gold')
const recommend_firend = () => import(/* webpackChunkName: "userh5recommend" */'mobile/views/user/recommend-firend')
const experience_gold = () => import(/* webpackChunkName: "userh5experience" */'mobile/views/user/experience-gold')
const preferentialList = () => import(/* webpackChunkName: "userh5preferentialList" */'mobile/views/user/preferentialList')
const couponList = () => import(/* webpackChunkName: "userh5couponList" */'mobile/views/user/couponList')

const balance = () => import(/* webpackChunkName: "balance" */'mobile/views/user/balance')

export default [
  // 用户中心首页
  {
    path: '/usercenter',
    component: Layout3,
    children: [{
      path: '/',
      redirect: '/usercenter/index'
    },
    {
      path: 'index',
      component: index,
      name: 'usercenter',
      meta: {
        auth: [AUTH_NAME.USER]
      }
    }
    ]
  },
  //余额查询头部单独写
  {
    path: '/user',
    component: Layout4, // 一级路由版
    meta: {
      auth: [AUTH_NAME.USER]
    },
    children: [
      {
        path: 'balance',
        name: 'balance',
        component: balance,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '游戏平台余额'
        }
      }
    ]
  },
  // 普通用户专有页面
  {
    path: '/user',
    name: 'user',
    component: Layout2, // 一级路由版
    meta: {
      auth: [AUTH_NAME.USER]
    },
    children: [
      // 用户额度记录查询（默认查询第一个在线存款）
      {
        path: 'log',
        name: 'user_log',
        component: log,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '记录查询'
        }
      },
      // 记录查询详情
      {
        path: 'logDetails',
        name: 'user_logDetails',
        component: log_details,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '账单详情'
        }
      },
      // 用户优惠
      // 优惠列表页
      {
        path: 'preferentialList',
        name: 'preferentialList',
        component: preferentialList,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '优惠中心'
        }
      },
      // 体验金
      {
        path: 'experiencegold',
        name: 'user_experiencegold',
        component: experience_gold,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '体验金'
        }
      },
      // 存送优惠
      {
        path: 'savesend',
        name: 'user_savesend',
        component: save_send,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '存送优惠'
        }
      },
      // 洗码/反水
      {
        path: 'washcode',
        name: 'user_washcode',
        component: wash_code,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '洗码'
        }
      },
      // 救援金
      {
        path: 'helpgold',
        name: 'user_helpgold',
        component: help_gold,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '救援金'
        }
      },
      // vip自助晋级
      {
        path: 'vipgold',
        name: 'user_vipgold',
        component: vip_gold,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '自助晋级'
        }
      }, 
      // 生日礼金
      {
        path: 'birthdaygold',
        name: 'user_birthdaygold',
        component: birthday_gold,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '生日礼金'
        }
      },
      // 推荐好友
      {
        path: 'recommendfirend',
        name: 'user_recommendfirend',
        component: recommend_firend,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '推荐好友'
        }
      },
      // 优惠券列表
      {
        path: 'couponList/:type?',
        name: 'couponList',
        component: couponList,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '优惠券'
        }
      },
      // 优惠券
      {
        path: 'discountcode',
        name: 'user_discountcode',
        component: discount_code,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '优惠券'
        }
      },
      // 红包优惠券
      {
        path: 'redenvelope',
        name: 'red_envelope',
        component: red_envelope,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '红包优惠券'
        }
      }
    ]
  }
]
