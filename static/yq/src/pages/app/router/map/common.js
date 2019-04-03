import {
  AUTH_NAME
} from '@/store/types' // 权限名称
// 公共的功能页面路由
import layout2 from 'app/master/t1/page-in' // 二级路由模板页
import layout3 from 'mobile/master/t1/page-foot' //去掉顶部的 留有底部
const deposit = () =>
  import( /* webpackChunkName: "commonh5deposit" */ 'mobile/views/money/deposit') // q存款
const depositMenu = () =>
  import( /* webpackChunkName: "commonh5depositMenu" */ 'mobile/views/money/depositMenu') // q存款
const backCall = () =>
  import( /* webpackChunkName: "commonh5callback" */ 'mobile/views/common/back-Call') // 电话回拨

const guideMenu = () => import( /* webpackChunkName: "guideMenu" */ 'mobile/views/extend/deposit-guide/guide-menu') // 新手指南
const guideEbank = () => import( /* webpackChunkName: "guideEbank" */ 'mobile/views/extend/deposit-guide/guide-ebank') // 户内转账教程
const guideEbankpc = () => import( /* webpackChunkName: "guideEbankpc" */ 'mobile/views/extend/deposit-guide/guide-ebankpc') // 户内转账教程pc
const guideReturn = () => import( /* webpackChunkName: "guideReturn" */ 'mobile/views/extend/deposit-guide/guide-return') // 户内转账教程(归户)
const guideReturnpc = () => import( /* webpackChunkName: "guideReturnpc" */ 'mobile/views/extend/deposit-guide/guide-returnpc') // 户内转账教程(归户pc)
const guideWechat = () => import( /* webpackChunkName: "guideWechat" */ 'mobile/views/extend/deposit-guide/guide-wechat') // 如何取款
const guideWechatpc = () => import( /* webpackChunkName: "guideWechatpc" */ 'mobile/views/extend/deposit-guide/guide-wechatpc') // 如何取款pc
const guideForget = () => import( /* webpackChunkName: "guideForget" */ 'mobile/views/extend/deposit-guide/guide-forget') // 忘记密码
const guideForgetpc = () => import( /* webpackChunkName: "guideForgetpc" */ 'mobile/views/extend/deposit-guide/guide-forgetpc') // 忘记密码pc
const guideEnrol = () => import( /* webpackChunkName: "guideEnrol" */ 'mobile/views/extend/deposit-guide/guide-enrol') // 如何注册账号
const guideEnrolpc = () => import( /* webpackChunkName: "guideEnrolpc" */ 'mobile/views/extend/deposit-guide/guide-enrolpc') // 如何注册账号pc
const guideLogin = () => import( /* webpackChunkName: "guideLogin" */ 'mobile/views/extend/deposit-guide/guide-login') // 如何注册账号
const guideLoginpc = () => import( /* webpackChunkName: "guideLoginpc" */ 'mobile/views/extend/deposit-guide/guide-loginpc') // 如何注册账号pc
const guideFavorable = () => import( /* webpackChunkName: "guideFavorable" */ 'mobile/views/extend/deposit-guide/guide-favorable') // 如何申请自助优惠
const guideFavorablepc = () => import( /* webpackChunkName: "guideFavorablepc" */ 'mobile/views/extend/deposit-guide/guide-favorablepc') // 如何申请自助优惠pc
const guideDownload = () => import( /* webpackChunkName: "guideDownload" */ 'mobile/views/extend/deposit-guide/guide-download') // 奇幻城APP下载指南
const guideDownloadios = () => import( /* webpackChunkName: "guideDownloadios" */ 'mobile/views/extend/deposit-guide/guide-downloadios') // 奇幻城APP下载指南IOS
const guideWeixin = () => import( /* webpackChunkName: "guideWeixin" */ 'mobile/views/extend/deposit-guide/guide-weixin') // 户内转账教程
const guideWeixinpc = () => import( /* webpackChunkName: "guideWeixinpc" */ 'mobile/views/extend/deposit-guide/guide-weixinpc') // 户内转账教程pc
const guideAlipay = () => import( /* webpackChunkName: "guideAlipay" */ 'mobile/views/extend/deposit-guide/guide-alipay') // 户内转账教程
const guideAlipaypc = () => import( /* webpackChunkName: "guideAlipaypc" */ 'mobile/views/extend/deposit-guide/guide-alipaypc') // 户内转账教程pc
const guideBanking = () => import( /* webpackChunkName: "guideBanking" */ 'mobile/views/extend/deposit-guide/guide-banking') // 户内转账教程
const guideBankingpc = () => import( /* webpackChunkName: "guideBankingpc" */ 'mobile/views/extend/deposit-guide/guide-bankingpc') // 户内转账教程pc
const guideJdpay = () => import( /* webpackChunkName: "guideJdpay" */ 'mobile/views/extend/deposit-guide/guide-jdpay') // 户内转账教程
const guideJdpaypc = () => import( /* webpackChunkName: "guideJdpaypc" */ 'mobile/views/extend/deposit-guide/guide-jdpaypc') // 户内转账教程pc

export default [{
    path: '/commonDeposit',
    component: layout2, // 二级路由模板页
    name: 'commonDepositLayout',
    redirect: '/commonDeposit/depositMenu',
    meta: {
      auth: [AUTH_NAME.USER] // 需要会员
    },
    children: [
      // 存款页面
      {
        path: 'deposit/:type?',
        name: 'money_deposit',
        component: deposit,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '充值',
          isApp: false,
          noCache: true // 不缓存该组件
        }
      },
      {
        path: 'depositMenu',
        name: 'money_depositMenu',
        component: depositMenu,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '充值',
          isApp: false,
          noCache: true // 不缓存该组件
        }
      },
    ]
  },
  // 电话回拨
  {
    path: 'backCall',
    name: 'backCall',
    component: backCall,
    meta: {
      headName: '电话回拨',
      auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员代理

    }
  },
  {
    path: '/guide',
    name: 'guide',
    component: {
      template: '<router-view></router-view>'
    }, 
    // 一级路由版
    redirect: "/guide/menu",
    children: [{
        path: 'menu',
        name: 'guideMenu',
        component: guideMenu,
        meta: {
          headName: '新手指南'
        }
      },
      {
        path: 'ebank',
        name: 'guideEbank',
        component: guideEbank,
        meta: {
          headName: '户内转账教程'
        }
      },
      {
        path: 'ebankpc',
        name: 'guideEbankpc',
        component: guideEbankpc,
        meta: {
          headName: '户内转账教程'
        }
      },
      {
        path: 'return',
        name: 'guideReturn',
        component: guideReturn,
        meta: {
          headName: '户内转账教程'
        }
      },
      {
        path: 'returnpc',
        name: 'guideReturnpc',
        component: guideReturnpc,
        meta: {
          headName: '户内转账教程'
        }
      },
      {
        path: 'wechat',
        name: 'guideWechat',
        component: guideWechat,
        meta: {
          headName: '如何取款'
        }
      },
      {
        path: 'wechatpc',
        name: 'guideWechatpc',
        component: guideWechatpc,
        meta: {
          headName: '如何取款'
        }
      },
      {
        path: 'forget',
        name: 'guideForget',
        component: guideForget,
        meta: {
          headName: '忘记密码'
        }
      },
      {
        path: 'forgetpc',
        name: 'guideForgetpc',
        component: guideForgetpc,
        meta: {
          headName: '忘记密码'
        }
      },
      {
        path: 'enrol',
        name: 'guideEnrol',
        component: guideEnrol,
        meta: {
          headName: '如何注册账号'
        }
      },
      {
        path: 'enrolpc',
        name: 'guideEnrolpc',
        component: guideEnrolpc,
        meta: {
          headName: '如何注册账号'
        }
      },
      {
        path: 'login',
        name: 'guideLogin',
        component: guideLogin,
        meta: {
          headName: '如何登陆账号'
        }
      },
      {
        path: 'loginpc',
        name: 'guideLoginpc',
        component: guideLoginpc,
        meta: {
          headName: '如何登陆账号'
        }
      },
      {
        path: 'favorable',
        name: 'guideFavorable',
        component: guideFavorable,
        meta: {
          headName: '如何申请自助优惠'
        }
      },
      {
        path: 'favorablepc',
        name: 'guideFavorablepc',
        component: guideFavorablepc,
        meta: {
          headName: '如何申请自助优惠'
        }
      },
      {
        path: 'download',
        name: 'guideDownload',
        component: guideDownload,
        meta: {
          headName: '奇幻城APP下载指南'
        }
      },
      {
        path: 'downloadios',
        name: 'guideDownloadios',
        component: guideDownloadios,
        meta: {
          headName: '奇幻城APP下载指南'
        }
      },
      // 微信存款教程
      {
        path: 'weixin',
        name: 'guideWeixin',
        component: guideWeixin,
        meta: {
          headName: '存款教程'
        }
      },
      {
        path: 'weixinpc',
        name: 'guideWeixinpc',
        component: guideWeixinpc,
        meta: {
          headName: '存款教程'
        }
      },
      // 支付宝存款教程
      {
        path: 'alipay',
        name: 'guideAlipay',
        component: guideAlipay,
        meta: {
          headName: '存款教程'
        }
      },
      {
        path: 'alipaypc',
        name: 'guideAlipaypc',
        component: guideAlipaypc,
        meta: {
          headName: '存款教程'
        }
      },
      // 网银存款教程
      {
        path: 'banking',
        name: 'guideBanking',
        component: guideBanking,
        meta: {
          headName: '存款教程'
        }
      },
      {
        path: 'bankingpc',
        name: 'guideBankingpc',
        component: guideBankingpc,
        meta: {
          headName: '存款教程'
        }
      },
      // 银联京东存款教程
      {
        path: 'jdpay',
        name: 'guideJdpay',
        component: guideJdpay,
        meta: {
          headName: '存款教程'
        }
      },
      {
        path: 'jdpaypc',
        name: 'guideJdpaypc',
        component: guideJdpaypc,
        meta: {
          headName: '存款教程'
        }
      },
    ]
  },
]
