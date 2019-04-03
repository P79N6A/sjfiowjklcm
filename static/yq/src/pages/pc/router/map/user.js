import {
  AUTH_NAME
} from '@/store/types'
import master from 'pc/master/user' // 模板
// 用户完善/编辑信息页面
const datum = () =>
  import( /* webpackChunkName: "userpcinfo" */ 'pc/views/common/datum') // 个人资料
// 用户汇总页面
const detail = () =>
  import( /* webpackChunkName: "detail" */ 'pc/views/user/detail') // 用户首页等级
// 用户设置
const setting = () =>
  import( /* webpackChunkName: "settingpcsetting" */ 'pc/views/user/setting') // 用户设置
// 银行卡列表
const banks = () =>
  import( /* webpackChunkName: "bankspcbank" */ 'pc/views/common/banks') // banks设置
// 用户密码
const password = () =>
  import( /* webpackChunkName: "passwordpcpwd" */ 'pc/views/common/pwd/password') // password
// 支付密码
const payword = () =>
  import( /* webpackChunkName: "passwordpcpaypwd" */ 'pc/views/common/pwd/payword') // pwdword
// 用户钱包
const wallet = () =>
  import( /* webpackChunkName: "wallet" */ 'pc/views/user/wallet') // pwdword
// 用户优惠
const discount = () =>
  import( /* webpackChunkName: "discount" */ 'pc/views/user/discount') // pwdword
// 用户日志
const log = () =>
  import( /* webpackChunkName: "userlog" */ 'pc/views/user/log') // 记录查询
// 用户站内信
const message = () =>
  import( /* webpackChunkName: "usermessage" */ 'pc/views/common/message') // 站内消息
// 用户优惠有关
// 体验金
const experience = () =>
  import( /* webpackChunkName: "experience" */ 'pc/views/user/discount/components/experience-gold')
// 存送优惠
const savesend = () =>
  import( /* webpackChunkName: "savesend" */ 'pc/views/user/discount/components/save-send')
// 洗码
const washcode = () =>
  import( /* webpackChunkName: "washcode" */ 'pc/views/user/discount/components/wash-code')
// 优惠券
const coupon = () =>
  import( /* webpackChunkName: "coupon" */ 'pc/views/user/discount/components/discount-code')
// 红包优惠券
const redenvelope = () =>
  import( /* webpackChunkName: "redenvelope" */ 'pc/views/user/discount/components/red-envelope')
// 救援金
const help = () =>
  import( /* webpackChunkName: "help" */ 'pc/views/user/discount/components/help-gold')
// vip礼金
const vip = () =>
  import( /* webpackChunkName: "vip" */ 'pc/views/user/discount/components/vip-gold')
// 生日礼金
const birthday = () =>
  import( /* webpackChunkName: "birthday" */ 'pc/views/user/discount/components/birthday-gold')
// 邀请好友
const recommend = () =>
  import( /* webpackChunkName: "recommend" */ 'pc/views/user/discount/components/recommend-firend')

// 用户钱包有关
const deposit = () =>
  import( /* webpackChunkName: "deposit"  */ 'pc/views/common/money/deposit')
const drawmoney = () =>
  import( /* webpackChunkName: "withdraw" */ 'pc/views/common/money/drawmoney')
const transfer = () =>
  import( /* webpackChunkName: "discount" */ 'pc/views/common/money/transfer')
const log_deposit = () =>
  import( /* webpackChunkName: "log_deposit" */ 'pc/views/user/log/deposit')
const log_withdraw = () =>
  import( /* webpackChunkName: "log_withdraw" */ 'pc/views/user/log/withdraw')
const log_transfer = () =>
  import( /* webpackChunkName: "log_transfer" */ 'pc/views/user/log/transfer')
const log_couponRecords = () =>
  import( /* webpackChunkName: "log_couponRecords" */ 'pc/views/user/log/couponRecords')
const log_ximaDetail = () =>
  import( /* webpackChunkName: "log_ximaDetail" */ 'pc/views/user/log/ximaDetail')
const log_deputyRecords = () =>
  import( /* webpackChunkName: "log_deputyRecords" */ 'pc/views/user/log/deputyRecords')
const log_concessionReccords = () =>
  import( /* webpackChunkName: "log_concessionReccords" */ 'pc/views/user/log/concessionReccords')
const log_friend = () =>
  import( /* webpackChunkName: "log_friend" */ 'pc/views/user/log/friend')

const service = () =>
  import( /* webpackChunkName: "log_friend" */ 'pc/views/common/serviceList')
log_couponRecords
log_transfer
export default [{
  path: '/user',
  name: 'user',
  component: master,
  redirect: '/user/setting',
  meta: {
    auth: [AUTH_NAME.USER]
  },
  children: [{
      // 配置重定向
      path: '/',
      redirect: '/user/setting',
      meta: {
        auth: [AUTH_NAME.USER]
      }
    },
    // 用户中心概览页
    {
      path: 'detail',
      component: detail,
      name: 'user_detail',
      meta: {
        auth: [AUTH_NAME.USER]
      }
    },
    // 用户设置
    {
      path: 'setting',
      component: setting,
      name: 'user_setting',
      redirect: 'setting/datum',
      meta: {
        auth: [AUTH_NAME.USER]
      },
      children: [{
          // 完善/编辑用户数据
          path: 'datum',
          component: datum,
          name: 'datum',
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          // 银行卡列表
          path: 'banks',
          component: banks,
          name: 'banks',
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          // 设置用户密码
          path: 'password',
          component: password,
          name: 'password',
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          // 设置用户支付密码
          path: 'payword',
          component: payword,
          name: 'payword',
          meta: {
            auth: [AUTH_NAME.USER]
          }
        }
      ]
    },
    // 用户钱包中心
    {
      path: 'wallet',
      name: 'user_wallet',
      component: wallet,
      redirect: 'wallet/deposit',
      meta: {
        auth: [AUTH_NAME.USER]
      },
      children: [{
          // 用户存款
          path: 'deposit',
          name: 'deposit',
          component: deposit,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },

        {
          // 用户提款
          path: 'drawmoney',
          name: 'drawmoney',
          component: drawmoney,
          meta: {
            // 代理可以提款
            auth: [AUTH_NAME.USER]
          }
        },
        {
          // 用户转账
          path: 'transfer',
          name: 'transfer',
          component: transfer,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        }
      ]
    },
    // 用户领取优惠券
    {
      path: 'discount',
      name: 'user_discount',
      component: discount,
      redirect: 'discount/savesend', //重定向
      meta: {
        auth: [AUTH_NAME.USER]
      },
      children: [{
          path: 'experience',
          name: 'discount_experience',
          component: experience,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'savesend',
          name: 'discount_savesend',
          component: savesend,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'redenvelope',
          name: 'discount_redenvelope',
          component: redenvelope,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'washcode',
          name: 'discount_washcode',
          component: washcode,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'coupon',
          name: 'discount_coupon',
          component: coupon,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'help',
          name: 'discount_help',
          component: help,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'vip',
          name: 'discount_vip',
          component: vip,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'birthday',
          name: 'discount_birthday',
          component: birthday,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        },
        {
          path: 'recommend',
          name: 'discount_recommend',
          component: recommend,
          meta: {
            auth: [AUTH_NAME.USER]
          }
        }
      ]
    },
    // 用户记录页面
    {
      // 查询记录
      path: 'log',
      name: 'user_log',
      component: log,
      redirect: 'log/deposit', // 重定向
      meta: {
        auth: [AUTH_NAME.USER]
      },
      children: [{
        path: 'deposit',
        name: 'log_deposit',
        component: log_deposit,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }, {
        path: 'withdraw',
        name: 'log_withdraw',
        component: log_withdraw,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }, {
        path: 'transfer',
        name: 'log_transfer',
        component: log_transfer,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }, {
        path: 'couponRecords',
        name: 'log_couponRecords',
        component: log_couponRecords,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }, {
        path: 'ximaDetail',
        name: 'log_ximaDetail',
        component: log_ximaDetail,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }, {
        path: 'concessionReccords',
        name: 'log_concessionReccords',
        component: log_concessionReccords,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }, {
        path: 'deputyRecords',
        name: 'log_deputyRecords',
        component: log_deputyRecords,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }, {
        path: 'friend',
        name: 'log_friend',
        component: log_friend,
        meta: {
          auth: [AUTH_NAME.USER]
        }
      }]
    },
    // 用户站内信
    {
      path: 'message',
      name: 'message',
      component: message,
      meta: {
        auth: [AUTH_NAME.USER]
      }
    },
    // 回馈意见
    {
      path: 'service',
      name: 'service',
      component: service,
      meta: {
        auth: [AUTH_NAME.USER]
      }
    },

  ]
}]
