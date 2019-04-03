// 代理 路由
import {
  AUTH_NAME
} from '@/store/types' // 权限名称
import master from 'pc/master/agent'
// 用户完善/编辑信息页面
const datum = () =>
  import ( /* webpackChunkName: "userpcinfo" */ 'pc/views/common/datum') // 个人资料
// 用户设置
const setting = () =>
  import ( /* webpackChunkName: "pcsetting" */ 'pc/views/user/setting') // 用户设置
// 银行卡列表
const banks = () =>
  import ( /* webpackChunkName: "bankspcbank" */ 'pc/views/common/banks') // banks设置
// 用户密码
const password = () =>
  import ( /* webpackChunkName: "passwordpcpwd" */ 'pc/views/common/pwd/password') // password
// 支付密码
const payword = () =>
  import ( /* webpackChunkName: "passwordpcpaypwd" */ 'pc/views/common/pwd/payword') // pwdword
// 用户钱包
const wallet = () =>
  import ( /* webpackChunkName: "wallet" */ 'pc/views/user/wallet')
// 用户站内信
const message = () =>
  import ( /* webpackChunkName: "usermessage" */ 'pc/views/common/message') // 站内消息

// 用户钱包有关
const drawmoney = () =>
  import ( /* webpackChunkName: "withdraw" */ 'pc/views/common/money/drawmoney')

const summary = () =>
  import(/* webpackChunkName: "agentpc" */ 'pc/views/agent/summary') // 数据汇总
const ptcommission = () =>
  import(/* webpackChunkName: "agentpc" */ 'pc/views/agent/ptcommission') // 佣金报表
const memberlist = () =>
  import(/* webpackChunkName: "agentpc" */ 'pc/views/agent/member-list') // 会员列表
const creditlog = () =>
  import(/* webpackChunkName: "agentpc" */ 'pc/views/agent/credit-log') // 额度记录
const memberbill = () =>
  import(/* webpackChunkName: "agentpc" */ 'pc/views/agent/member-bill') // 会员账务
const agentDetail = () =>
  import(/* webpackChunkName: "agentpc" */ 'pc/views/agent/agent-detail') // 代理个人中心
export default [{
  path: '/agent',
  name: 'agent',
  component: master,
  redirect: '/agent/detail',
  meta: {
    auth: [AUTH_NAME.AGENT]
  },
  children: [{
      // 配置重定向
      path: '/',
      redirect: '/agent/summary',
      meta: {
        auth: [AUTH_NAME.AGENT]
      }
    },
    // 汇总
    {
      path: 'summary',
      name: 'agent_summary',
      component: summary,
      meta: {
        auth: [AUTH_NAME.AGENT]
      }
    },
    // 佣金报表
    {
      path: 'ptcommission',
      name: 'agent_ptcommission',
      component: ptcommission,
      meta: {
        auth: [AUTH_NAME.AGENT]
      }
    },
    // 会员列表
    {
      path: 'memberList',
      name: 'agent_memberlist',
      component: memberlist,
      meta: {
        auth: [AUTH_NAME.AGENT]
      }
    },
    // 额度记录
    {
      path: 'creditlog',
      name: 'agent_creditlog',
      component: creditlog,
      meta: {
        auth: [AUTH_NAME.AGENT]
      }
    },
    // 代理设置
    {
      path: 'agentDetail',
      name: 'agentDetail',
      component: agentDetail,
      redirect: 'agentDetail/setting',
      meta: {
        auth: [AUTH_NAME.AGENT]
      },
      children: [
        {
          // 代理设置
          path: 'setting',
          component:setting,
          name: 'agent_setting',
          redirect: 'setting/datum',
          meta: {
            auth: [AUTH_NAME.AGENT]
          },
          children: [
            {
              // 个人资料
              path: 'datum',
              component:datum,
              name: 'agent_datum',
              meta: {
                auth: [AUTH_NAME.AGENT]
              }
            }
          ]
        },
        // 银行卡列表
        {
          path: 'banks',
          component:banks,
          name: 'agent_banks',
          meta: {
            auth: [ AUTH_NAME.AGENT]
          }
        },
        // 代理修改密码
        {
          path: 'passowrd',
          component:password,
          name: 'agent_password',
          meta: {
            auth: [AUTH_NAME.AGENT]
          }
        },
        // 代理修改支付密码
        {
          path: 'payword',
          component:payword,
          name: 'agent_payword',
          meta: {
            auth: [ AUTH_NAME.AGENT]
          }
        }
      ]
    },
    // 会员账务
    {
      path: 'memberbill',
      name: 'agent_memberbill',
      component: memberbill,
      redirect: 'memberbill/deposit',
      meta: {
        auth: [AUTH_NAME.AGENT]
      },
      children: [{
        // 会员存款
        path: 'deposit',
        name: 'agent_deposit',
        component() {
          return import(/* webpackChunkName: "discountpcsavesend" */ 'pc/views/agent/member-bill/components/deposit')
        },
        meta: {
          auth: [AUTH_NAME.AGENT]
        }
      },
      {
        // 会员提款
        path: 'withdraw',
        name: 'agent_withdraw',
        component() {
          return import(/* webpackChunkName: "discountpcsavesend" */ 'pc/views/agent/member-bill/components/withdraw')
        },
        meta: {
          auth: [AUTH_NAME.AGENT]
        }
      },
      {
        // 会员洗码/返水
        path: 'feedback',
        name: 'agent_feedback',
        component() {
          return import(/* webpackChunkName: "discountpcsavesend" */ 'pc/views/agent/member-bill/components/feedback')
        },
        meta: {
          auth: [AUTH_NAME.AGENT]
        }
      },
      {
        // 会员优惠
        path: 'promo',
        name: 'agent_promo',
        component() {
          return import(/* webpackChunkName: "discountpcsavesend" */ 'pc/views/agent/member-bill/components/promo')
        },
        meta: {
          auth: [AUTH_NAME.AGENT]
        }
      },
      {
        // 会员输赢
        path: 'winlost',
        name: 'agent_winlose',
        component() {
          return import(/* webpackChunkName: "discountpcsavesend" */ 'pc/views/agent/member-bill/components/winlose')
        },
        meta: {
          auth: [AUTH_NAME.AGENT]
        }
      }]
    },
    // 钱包中心
    {
      path: 'wallet',
      name: 'agent_wallet',
      component: wallet,
      redirect: 'wallet/deposit',
      meta: {
        auth: [AUTH_NAME.AGENT]
      },
      children: [
        {
          // 用户提款
          path: 'drawmoney',
          name: 'agent_drawmoney',
          component: drawmoney,
          meta: {
            // 代理可以提款
            auth: [AUTH_NAME.AGENT]
          }
        }
      ]
    },
    // 代理站内信
    {
      path: 'message',
      name: 'agent_message',
      component: message,
      meta: {
        auth: [AUTH_NAME.AGENT]
      }
    }
  ]
}]
