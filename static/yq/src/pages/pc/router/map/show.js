/**
 * 说明，show文档里的都是展示有关的页面，
 * 相当于是几个必备的页面
 * 功能页面不要放这里，例如个人中心
 * 不要随便改动这个文件
 * 不要随便改动这个文件
 * 不要随便改动这个文件
 * 不要随便改动这个文件
 * 不要随便改动这个文件
 * 不要随便改动这个文件
 * 不要随便改动这个文件
 */
import Layout from 'pc/master/main'
import agentPage from 'pc/master/agentPage'
// 首页
const index = () =>
  import( /* webpackChunkName: "index" */ 'pc/views/show/index')
// 游戏大厅
const slotgame = () =>
  import( /* webpackChunkName: "slotgame" */ 'pc/views/show/slotgame')
// 优惠页面
const promo = () =>
  import( /* webpackChunkName: "promo" */ 'pc/views/show/promo')
// 下载页面
const download = () =>
  import( /* webpackChunkName: "download" */ 'pc/views/show/download')
// 公告详情页
const notice = () =>
  import( /* webpackChunkName: "notice" */ 'pc/views/show/notice')
// 代理加盟页
// const agentareaIndex = () =>
//   import(/* webpackChunkName: "sport" */ 'pc/views/show/agent-area/components/index')
// const agentareaSystem = () =>
//   import(/* webpackChunkName: "sport" */ 'pc/views/show/agent-area/components/system')
// const agentareaPlan= () =>
//   import(/* webpackChunkName: "sport" */ 'pc/views/show/agent-area/components/plan')
// const agentareaQuestion = () =>
//   import(/* webpackChunkName: "sport" */ 'pc/views/show/agent-area/components/question')
// const agentareaJoin = () =>
//   import(/* webpackChunkName: "sport" */ 'pc/views/show/agent-area/components/join')
const agentarea = () =>
  import( /* webpackChunkName: "sport" */ 'pc/views/show/agent-area')
// VIP页面
const vipPage = () =>
  import( /* webpackChunkName: "sport" */ 'pc/views/show/vip')
// 关于我们路由
const aboutUs = () =>
  import( /* webpackChunkName: "about" */ 'pc/views/show/about')
export default [
  // 配置根路径重定向
  {
    path: '/',
    redirect: '/home/index'
  },
  // 配置index重定向
  {
    path: '/index',
    name: 'index',
    redirect: '/home/index'
  },
  // 首页
  {
    path: '/home',
    component: Layout,
    children: [{
        path: '/',
        name: 'aindex',
        redirect: '/home/index'
      },
      {
        path: 'index',
        component: index,
        name: 'home',
        meta: {
          test: 'test'
        }
      }
    ]
  },
  // 游戏中心
  {
    path: '/slotgame',
    component: Layout,
    children: [{
        path: '/',
        name: 'slotgame',
        redirect: '/slotgame/index'
      },
      {
        path: 'index/:type?',
        component: slotgame,
        name: 'gameIndex'
      }
    ]
  },
  // 优惠中心
  {
    path: '/promo',
    component: Layout,
    children: [{
      path: '/',
      name: 'pIndex',
      redirect: '/promo/index'
    },
    {
      path: 'index',
      component: promo,
      name: 'promosIndex'
    }
    ]
  },
  // 下载中心
  {
    path: '/download',
    component: Layout,
    children: [{
        path: '/',
        name: 'dIndex',
        redirect: '/download/index'
      },
      {
        path: 'index',
        component: download,
        name: 'downloadIndex'
      }
    ]
  },
  // 公告中心
  {
    path: '/news',
    component: Layout,
    children: [{
        path: '/',
        name: 'nIndex',
        redirect: '/news/index'
      },
      {
        path: 'index',
        component: notice,
        name: 'newsIndex'
      }
    ]
  },
  // VIP中心
  {
    path: '/vip',
    component: Layout,
    children: [{
        path: '/',
        name: 'vIndex',
        redirect: '/vip/index'
      },
      {
        path: 'index',
        component: vipPage,
        name: 'vipIndex'
      }
    ]
  },
  // 网站介绍
  {
    path: '/aboutus',
    component: Layout,
    children: [{
        path: '/',
        name: 'abIndex',
        redirect: '/aboutus/home'
      },
      {
        path: 'home/:tab?',
        name: 'aboutIndex',
        component: aboutUs
      }
    ]
  },
  // 代理加盟
  // {
  //   path: '/cooperation',
  //   component: agentPage,
  //   children: [{
  //     path: '/',
  //     name: 'cIndex',
  //     redirect: '/cooperation/index'
  //   },
  //   {
  //     path: 'index',
  //     component: agentareaIndex,
  //     name: 'agentareaIndex'
  //   },
  //   {
  //     path: 'system',
  //     component: agentareaSystem ,
  //     name: 'agentareaSystem'
  //   },
  //   {
  //     path: 'plan',
  //     component: agentareaPlan,
  //     name: 'agentareaPlan'
  //   },
  //   {
  //     path: 'question',
  //     component: agentareaQuestion,
  //     name: 'agentareaQuestion'
  //   },
  //   {
  //     path: 'join',
  //     component: agentareaJoin,
  //     name: 'agentareaJoin'
  //   }
  //   ]
  // }
  {
    path: '/cooperation',
    component: agentPage,
    children: [{
        path: '/',
        name: 'cIndex',
        redirect: '/cooperation/index'
      },
      {
        path: 'index/:tab?',
        name: 'agentarea',
        component: agentarea
      }
    ]
  },
]
