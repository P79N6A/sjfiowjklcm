import {
  AUTH_NAME
} from '@/store/types' // 权限名称
// 公共的功能页面路由
import layout2 from 'mobile/master/t1/page-in' // 二级路由模板页
import layout3 from 'mobile/master/t1/page-nothing' // 二级路由模板页
const deposit = () =>
  import ( /* webpackChunkName: "commonh5deposit" */ 'mobile/views/money/deposit') // q存款
const drawmoney = () =>
  import ( /* webpackChunkName: "commonh5draw" */ 'mobile/views/money/drawmoney') // 取款
const transfer = () =>
  import ( /* webpackChunkName: "commonh5trans" */ 'mobile/views/money/transfer') // 转账
const payupdate = () =>
  import ( /* webpackChunkName: "commonh5payupdate" */ 'mobile/views/password/pay-update') // 支付密码修改
const payset = () =>
  import ( /* webpackChunkName: "commonh5payset" */ 'mobile/views/password/pay-set') // 支付密码设置
const loginupdate = () =>
  import ( /* webpackChunkName: "commonh5loginupdate" */ 'mobile/views/password/login-update') // 登录密码设置
const addBank = () =>
  import ( /* webpackChunkName: "commonh5bindbank" */ 'mobile/views/common/bank-bind') // 银行卡绑定
const bankList = () =>
  import ( /* webpackChunkName: "commonh5bindbankList" */ 'mobile/views/common/bankList') // 银行卡管理
const security = () =>
  import ( /* webpackChunkName: "commonh5security" */ 'mobile/views/user/security') // 用户安全中心
const personalList = () =>
  import ( /* webpackChunkName: "commonh5personalList" */ 'mobile/views/user/personalList') // 账户设置列表页 
const personal = () =>
  import ( /* webpackChunkName: "commonh5personal" */ 'mobile/views/user/personal') // 用户个人资料  
const backCall = () =>
  import ( /* webpackChunkName: "commonh5callback" */ 'mobile/views/common/back-Call') // 电话回拨
const message = () =>
  import ( /* webpackChunkName: "commonh5message" */ 'mobile/views/common/message') // 站内消息

const forgotpwd = () =>
  import ( /* webpackChunkName: "commonh5findpwd" */ 'mobile/views/common/forgot-pwd') // 忘记密码
const forgotpwdPhone = () =>
  import ( /* webpackChunkName: "commonh5findpwd" */ 'mobile/views/common/forgot-pwd/components/find-phone') // 忘记密码
const forgotpwdEmail = () =>
  import ( /* webpackChunkName: "commonh5findpwd" */ 'mobile/views/common/forgot-pwd/components/find-email') // 忘记密码

const forgotPayword = () =>
  import ( /* webpackChunkName: "commonh5findpwd" */ 'mobile/views/common/findback') // 忘记支付密码
const verify = () =>
  import ( /* webpackChunkName: "commonh5verify" */ 'mobile/views/user/verify') // 手机验证
const redirect_deposit = (resolve) => resolve(require('mobile/views/common/redirect')) // APP验证跳转

export default [{
    // 取款,转账 头部自己写
    path: '/common',
    component: layout3, // 二级路由模板页
    meta: {
      auth: [AUTH_NAME.USER] // 需要会员
    },
    children: [
      // 提款
      {
        path: 'drawmoney',
        name: 'money_drawmoney',
        component: drawmoney,
        meta: {
          headName: '提现',
          noCache: true, // 不缓存该组件
          auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员代理
        }
      },
      // 转账
      {
        path: 'transfer',
        name: 'money_transfer',
        component: transfer,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '转账',
          noCache: true // 不缓存该组件
        }
      },
    ],
  },
  {
    path: '/common',
    component: layout2, // 二级路由模板页
    meta: {
      auth: [AUTH_NAME.USER] // 需要会员
    },
    children: [
      // 存款页面
      {
        path: 'deposit',
        name: 'money_deposit',
        component: deposit,
        meta: {
          auth: [AUTH_NAME.USER],
          headName: '存款',
          noCache: true // 不缓存该组件
        }
      },
      // 绑定银行卡
        {
          path: 'addbank',
          name: 'addbank',
          component: addBank,
          meta: {
            headName: '绑定银行卡',
            noCache: true, // 不缓存该组件
            auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
          }
      },
       // 银行卡列表
       {
        path: 'bankList',
        name: 'bankList',
        component: bankList,
        meta: {
          headName: '银行卡管理',
          noCache: true, // 不缓存该组件
          auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
        }
      },
      // 用户安全中心
      {
        path: 'security',
        name: 'security',
        component: security,
        meta: {
          headName: '安全中心',
          noCache: true, // 不缓存该组件
          auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
        }
      },
      // 账户设置列表
      {
        path: 'personalList',
        name: 'personalList',
        component: personalList,
        meta: {
          headName: '账户设置',
          noCache: true, // 不缓存该组件
          auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
        }
      },
      // 用户个人资料
      {
        path: 'personal',
        name: 'personal',
        component: personal,
        meta: {
          headName: '个人资料',
          noCache: true, // 不缓存该组件
          auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
        }
      },
      // 验证手机号
      {
        path: 'verify',
        name: 'verify',
        component : verify,
        meta:{
          auth: [AUTH_NAME.USER],
          headName: '手机验证'
        }
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
       // 站内消息
       {
        path: 'message',
        name: 'message',
        component: message,
        meta: {
          headName: '站内消息',
        auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员代理

        }
      },
      // 忘记密码
      {
        path: '/forgotpwd',
        name: 'forgotpwd',
        component: forgotpwd,
        redirect: '/forgotpwd/phone',
        meta: {
          headName: '忘记密码'
        },
        children: [{
            path: 'phone',
            name: 'forgotpwdPhone',
            component: forgotpwdPhone,
            meta: {
              title: '短信找回'
            }
          },
          {
            path: 'email',
            name: 'forgotpwdEmail',
            component: forgotpwdEmail,
            meta: {
              title: '邮箱找回'
            }
          }
        ]
      }
    ]},
    // 密码设置
    {
      path: '/pwd',
      name: 'pwd',
      component: layout2, 
      meta: {
        auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
      },
      children: [{
          path: 'payset',
          name: 'payset',
          component: payset,
          meta: {
            headName: '设置支付密码',
            noCache: true, // 不缓存组件，
            auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用

          }
        },
        {
          path: 'payupdate',
          name: 'payupdate',
          component: payupdate,
          meta: {
            headName: '修改支付密码',
            noCache: true, // 不缓存组件
            auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
          }
        },
        {
          path: 'forgotPayword',
          name: 'forgotPayword',
          component: forgotPayword,
          meta: {
            headName: '重置支付密码',
            noCache: true, // 不缓存组件
            auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
          }
        },
        {
          path: 'loginupdate',
          name: 'loginupdate',
          component: loginupdate,
          meta: {
            headName: '修改登录密码',
            noCache: true, // 不缓存组件
            auth: [AUTH_NAME.USER, AUTH_NAME.AGENT] // 会员/代理共用
          }
        }
      ]
    }
  ]
