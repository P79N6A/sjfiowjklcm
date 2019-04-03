import {
  AUTH_NAME
} from "@/store/types"; // 权限名称
import Layout from "mobile/master/t1/show"; // 基础外框
import Layout2 from "mobile/master/t1/page-in"; // 带返回操作的外框
import Layout3 from "mobile/master/t1/page-foot"; //去掉顶部的 留有底部
import Layout4 from "mobile/master/t1/page-nothing"; //去掉头部和底部
import Layout5 from "mobile/master/t1/page-head"; //去掉底部的 留有顶部
const sport = () =>
  import( /* webpackChunkName: "showh5sport" */ "mobile/views/extend/sport"); // 体育
const girls = () =>
  import( /* webpackChunkName: "showh5girls" */ "mobile/views/extend/girls"); // girls
const chessHall = () =>
  import( /* webpackChunkName: "showh5chessHall" */ "mobile/views/extend/chessHall"); // 体育
const license = () =>
  import( /* webpackChunkName: "license" */ "mobile/views/extend/license"); // 牌照展示
const serviceList = () =>
  import( /* webpackChunkName: "service" */ "mobile/views/extend/serviceList"); // 服务中心
const service = () =>
  import( /* webpackChunkName: "service" */ "mobile/views/extend/service"); // 意见反馈
const serviceLog = () =>
  import( /* webpackChunkName: "service" */ "mobile/views/extend/serviceLog"); // 反馈记录
const free = () =>
  import( /* webpackChunkName: "showh5free" */ "mobile/views/extend/free"); // 免费试玩
const hijacking = () =>
  import( /* webpackChunkName: "showh5hijacking" */ "mobile/views/extend/hijacking"); // 防劫持hijacking
const welfare = () =>
  import( /* webpackChunkName: "showh5welfare" */ "mobile/views/extend/welfare"); // 专属福利
const history = () =>
  import( /* webpackChunkName: "showh5welfare" */ "mobile/views/extend/history"); // 奇幻城风采
const registerSuccess = () =>
  import( /* webpackChunkName: "showh5welfare" */ "mobile/views/extend/register-success"); // 注册成功

const depositMenu = () =>
  import( /* webpackChunkName: "commonh5depositMenu" */ "mobile/views/extend/depositMenu"); // 存款页面菜单

const guideMenu = () =>
  import( /* webpackChunkName: "guideMenu" */ "mobile/views/extend/deposit-guide/guide-menu"); // 新手指南
const guideEbank = () =>
  import( /* webpackChunkName: "guideEbank" */ "mobile/views/extend/deposit-guide/guide-ebank"); // 户内转账教程
const guideEbankpc = () =>
  import( /* webpackChunkName: "guideEbankpc" */ "mobile/views/extend/deposit-guide/guide-ebankpc"); // 户内转账教程pc
const guideReturn = () =>
  import( /* webpackChunkName: "guideReturn" */ "mobile/views/extend/deposit-guide/guide-return"); // 户内转账教程(归户)
const guideReturnpc = () =>
  import( /* webpackChunkName: "guideReturnpc" */ "mobile/views/extend/deposit-guide/guide-returnpc"); // 户内转账教程(归户pc)
const guideWechat = () =>
  import( /* webpackChunkName: "guideWechat" */ "mobile/views/extend/deposit-guide/guide-wechat"); // 如何取款
const guideWechatpc = () =>
  import( /* webpackChunkName: "guideWechatpc" */ "mobile/views/extend/deposit-guide/guide-wechatpc"); // 如何取款pc
const guideForget = () =>
  import( /* webpackChunkName: "guideForget" */ "mobile/views/extend/deposit-guide/guide-forget"); // 忘记密码
const guideForgetpc = () =>
  import( /* webpackChunkName: "guideForgetpc" */ "mobile/views/extend/deposit-guide/guide-forgetpc"); // 忘记密码pc
const guideEnrol = () =>
  import( /* webpackChunkName: "guideEnrol" */ "mobile/views/extend/deposit-guide/guide-enrol"); // 如何注册账号
const guideEnrolpc = () =>
  import( /* webpackChunkName: "guideEnrolpc" */ "mobile/views/extend/deposit-guide/guide-enrolpc"); // 如何注册账号pc
const guideLogin = () =>
  import( /* webpackChunkName: "guideLogin" */ "mobile/views/extend/deposit-guide/guide-login"); // 如何注册账号
const guideLoginpc = () =>
  import( /* webpackChunkName: "guideLoginpc" */ "mobile/views/extend/deposit-guide/guide-loginpc"); // 如何注册账号pc
const guideFavorable = () =>
  import( /* webpackChunkName: "guideFavorable" */ "mobile/views/extend/deposit-guide/guide-favorable"); // 如何申请自助优惠
const guideFavorablepc = () =>
  import( /* webpackChunkName: "guideFavorablepc" */ "mobile/views/extend/deposit-guide/guide-favorablepc"); // 如何申请自助优惠pc
const guideDownload = () =>
  import( /* webpackChunkName: "guideDownload" */ "mobile/views/extend/deposit-guide/guide-download"); // 奇幻城APP下载指南
const guideDownloadios = () =>
  import( /* webpackChunkName: "guideDownloadios" */ "mobile/views/extend/deposit-guide/guide-downloadios"); // 奇幻城APP下载指南IOS
const guideWeixin = () =>
  import( /* webpackChunkName: "guideWeixin" */ "mobile/views/extend/deposit-guide/guide-weixin"); // 户内转账教程
const guideWeixinpc = () =>
  import( /* webpackChunkName: "guideWeixinpc" */ "mobile/views/extend/deposit-guide/guide-weixinpc"); // 户内转账教程pc
const guideAlipay = () =>
  import( /* webpackChunkName: "guideAlipay" */ "mobile/views/extend/deposit-guide/guide-alipay"); // 户内转账教程
const guideAlipaypc = () =>
  import( /* webpackChunkName: "guideAlipaypc" */ "mobile/views/extend/deposit-guide/guide-alipaypc"); // 户内转账教程pc
const guideBanking = () =>
  import( /* webpackChunkName: "guideBanking" */ "mobile/views/extend/deposit-guide/guide-banking"); // 户内转账教程
const guideBankingpc = () =>
  import( /* webpackChunkName: "guideBankingpc" */ "mobile/views/extend/deposit-guide/guide-bankingpc"); // 户内转账教程pc
const guideJdpay = () =>
  import( /* webpackChunkName: "guideJdpay" */ "mobile/views/extend/deposit-guide/guide-jdpay"); // 户内转账教程
const guideJdpaypc = () =>
  import( /* webpackChunkName: "guideJdpaypc" */ "mobile/views/extend/deposit-guide/guide-jdpaypc"); // 户内转账教程pc
export default [{
    path: "/sport",
    component: sport,
    name: "sport",
    meta: {
      noCache: true, // 是否不缓存改组件,
      meta: {
        title: "沙巴体育"
      }
    }
  },
  // 存款页面菜单
  // {
  //   path: '/depositMenu',
  //   name: 'money_depositMenu',
  //   component: depositMenu,
  //   meta: {
  //     auth: [AUTH_NAME.USER],
  //     noCache: true, // 不缓存该组件
  //     headName: '充值'
  //   }
  // },
  // 棋牌游戏大厅
  {
    path: "/chessHall",
    component: Layout2,
    children: [{
        path: "/",
        name: "chessHallindex",
        redirect: "/chessHall/index"
      },
      {
        path: "index/:type?",
        component: chessHall,
        name: "chessHall",
        meta: {
          noCache: true, // 是否不缓存改组件,
          title: "棋牌游戏"
        }
      }
    ]
  },
  //牌照展示
  {
    path: "/license",
    component: Layout,
    children: [{
        path: "/",
        name: "licenseIndex",
        redirect: "/license/index"
      },
      {
        path: "index",
        component: license,
        name: "license",
        meta: {
          title: "牌照展示",
          isBack: true //显示菜单（true）或是返回
        }
      }
    ]
  },
  //牌照展示
  {
    path: "/girls",
    component: Layout,
    children: [{
        path: "/",
        name: "girlsIndex",
        redirect: "/girls/index"
      },
      {
        path: "index",
        component: girls,
        name: "girls",
        meta: {
          title: "喜爱夜蒲",
          isBack: true //显示菜单（true）或是返回
        }
      }
    ]
  },
  //服务中心
  {
    path: "/serviceList",
    component: Layout,
    children: [{
        path: "/",
        name: "serviceListIndex",
        redirect: "/serviceList/index"
      },
      {
        path: "index",
        component: serviceList,
        name: "serviceList",
        meta: {
          title: "服务中心",
          isBack: true //显示菜单（true）或是返回
        }
      },
      {
        path: "service",
        component: service,
        name: "service",
        meta: {
          title: "意见反馈",
          isBack: true //显示菜单（true）或是返回
        }
      },
      {
        path: "serviceLog",
        component: serviceLog,
        name: "serviceLog",
        meta: {
          title: "反馈记录",
          isBack: true //显示菜单（true）或是返回
        }
      }
    ]
  },
  //免费试玩
  {
    path: "/free",
    component: Layout,
    children: [{
        path: "/",
        name: "freeIndex",
        redirect: "/free/index"
      },
      {
        path: "index",
        component: free,
        name: "free",
        meta: {
          title: "游戏试玩",
          isBack: true //显示菜单（true）或是返回
        }
      }
    ]
  },
  //防劫持
  {
    path: "/hijacking",
    component: Layout,
    children: [{
        path: "/",
        name: "hijackingIndex",
        redirect: "/hijacking/index"
      },
      {
        path: "index",
        component: hijacking,
        name: "hijacking",
        meta: {
          title: "域名防劫持帮助",
          isBack: true //显示菜单（true）或是返回
        }
      }
    ]
  },
  //专属福利
  {
    path: "/welfare",
    component: Layout,
    children: [{
        path: "/",
        name: "welfareIndex",
        redirect: "/welfare/index"
      },
      {
        path: "index",
        component: welfare,
        name: "welfare",
        meta: {
          title: "专属福利",
          isBack: true //显示菜单（true）或是返回
        }
      }
    ]
  },
  //奇幻城风采
  {
    path: "/history",
    component: Layout,
    children: [{
        path: "/",
        name: "historyIndex",
        redirect: "/history/index"
      },
      {
        path: "index",
        component: history,
        name: "history",
        meta: {
          title: "奇幻城风采"
        }
      }
    ]
  },
  //注册成功
  {
    path: "/registerSuccess",
    component: Layout,
    children: [{
        path: "/",
        name: "registerSuccessIndex",
        redirect: "/registerSuccess/index"
      },
      {
        path: "index",
        component: registerSuccess,
        name: "registerSuccess",
        meta: {
          title: "注册成功"
        }
      }
    ]
  },
  // 新手指南
  {
    path: "/guide",
    name: "guide",
    component: Layout5, // 一级路由版
    redirect: "/guide/index",
    children: [
      {
        path: "menu",
        name: "guideMenu",
        component: guideMenu,
        meta: {
          headName: "新手指南",
          firstPage: true
        }
      },
      {
        path: "ebank",
        name: "guideEbank",
        component: guideEbank,
        meta: {
          headName: "户内转账教程",
          secondPage: true
        }
      },
      {
        path: "ebankpc",
        name: "guideEbankpc",
        component: guideEbankpc,
        meta: {
          headName: "户内转账教程",
          secondPage: true
        }
      },
      {
        path: "return",
        name: "guideReturn",
        component: guideReturn,
        meta: {
          headName: "户内转账教程",
          secondPage: true
        }
      },
      {
        path: "returnpc",
        name: "guideReturnpc",
        component: guideReturnpc,
        meta: {
          headName: "户内转账教程",
          secondPage: true
        }
      },
      {
        path: "wechat",
        name: "guideWechat",
        component: guideWechat,
        meta: {
          headName: "如何取款",
          secondPage: true
        }
      },
      {
        path: "wechatpc",
        name: "guideWechatpc",
        component: guideWechatpc,
        meta: {
          headName: "如何取款",
          secondPage: true
        }
      },
      {
        path: "forget",
        name: "guideForget",
        component: guideForget,
        meta: {
          headName: "忘记密码",
          secondPage: true
        }
      },
      {
        path: "forgetpc",
        name: "guideForgetpc",
        component: guideForgetpc,
        meta: {
          headName: "忘记密码",
          secondPage: true
        }
      },
      {
        path: "enrol",
        name: "guideEnrol",
        component: guideEnrol,
        meta: {
          headName: "如何注册账号",
          secondPage: true
        }
      },
      {
        path: "enrolpc",
        name: "guideEnrolpc",
        component: guideEnrolpc,
        meta: {
          headName: "如何注册账号",
          secondPage: true
        }
      },
      {
        path: "login",
        name: "guideLogin",
        component: guideLogin,
        meta: {
          headName: "如何登陆账号",
          secondPage: true
        }
      },
      {
        path: "loginpc",
        name: "guideLoginpc",
        component: guideLoginpc,
        meta: {
          headName: "如何登陆账号",
          secondPage: true
        }
      },
      {
        path: "favorable",
        name: "guideFavorable",
        component: guideFavorable,
        meta: {
          headName: "如何申请自助优惠",
          secondPage: true
        }
      },
      {
        path: "favorablepc",
        name: "guideFavorablepc",
        component: guideFavorablepc,
        meta: {
          headName: "如何申请自助优惠",
          secondPage: true
        }
      },
      {
        path: "download",
        name: "guideDownload",
        component: guideDownload,
        meta: {
          headName: "奇幻城APP下载指南",
          secondPage: true
        }
      },
      {
        path: "downloadios",
        name: "guideDownloadios",
        component: guideDownloadios,
        meta: {
          headName: "奇幻城APP下载指南",
          secondPage: true
        }
      },
      // 微信存款教程
      {
        path: "weixin",
        name: "guideWeixin",
        component: guideWeixin,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      },
      {
        path: "weixinpc",
        name: "guideWeixinpc",
        component: guideWeixinpc,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      },
      // 支付宝存款教程
      {
        path: "alipay",
        name: "guideAlipay",
        component: guideAlipay,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      },
      {
        path: "alipaypc",
        name: "guideAlipaypc",
        component: guideAlipaypc,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      },
      // 网银存款教程
      {
        path: "banking",
        name: "guideBanking",
        component: guideBanking,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      },
      {
        path: "bankingpc",
        name: "guideBankingpc",
        component: guideBankingpc,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      },
      // 银联京东存款教程
      {
        path: "jdpay",
        name: "guideJdpay",
        component: guideJdpay,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      },
      {
        path: "jdpaypc",
        name: "guideJdpaypc",
        component: guideJdpaypc,
        meta: {
          headName: "存款教程",
          secondPage: true
        }
      }
    ]
  }
];
