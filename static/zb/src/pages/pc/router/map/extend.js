/**
 * 说明，这里可以放业务扩展的页面
 */
import Layout from 'pc/master/main'
// 以下页面为专题页，可有可无，看需求
// 捕鱼入口
const fish = () =>
  import( /* webpackChunkName: "fish" */ 'pc/views/extend/fish')
// 真人入口页
const real = () =>
  import( /* webpackChunkName: "real" */ 'pc/views/extend/real')
// 体育入口页
const sport = () =>
  import( /* webpackChunkName: "sport" */ 'pc/views/extend/sport')
// 彩票专题页
const lottery = () =>
  import( /* webpackChunkName: "lottery" */ 'pc/views/extend/lottery')
// 电竞专题页
const esports = () =>
  import( /* webpackChunkName: "esports" */ 'pc/views/extend/esport')
// 棋牌专题页
const chess = () =>
  import( /* webpackChunkName: "esports" */ 'pc/views/extend/chess')
// 棋牌专题页
const chessHall = () =>
  import( /* webpackChunkName: "chessHall" */ 'pc/views/extend/chessHall')
// 下载教程页
const downloadTch = () =>
  import( /* webpackChunkName: "downloadTch" */ 'pc/views/extend/downloadTch')
  // 线路选择
const domains = () =>
  import( /* webpackChunkName: "domains" */ 'pc/views/extend/domains')
export default [
  // 捕鱼专题页
  {
    path: '/fish',
    component: Layout,
    children: [{
        path: '/',
        name: 'fishindex',
        redirect: '/fish/index'
      },
      {
        path: 'index',
        component: fish,
        name: 'fish'
      }
    ]
  },
  // 真人专题页
  {
    path: '/real',
    component: Layout,
    children: [{
        path: '/',
        name: 'realindex',
        redirect: '/real/index'
      },
      {
        path: 'index',
        component: real,
        name: 'real'
      }
    ]
  },
  // 体育专题页
  {
    path: '/sport',
    component: Layout,
    children: [{
        path: '/',
        name: 'sportindex',
        redirect: '/sport/index',
        noCache: true
      },
      {
        path: 'index',
        component: sport,
        name: 'sport',
        noCache: true
      }
    ]
  },
  // 彩票专题页
  {
    path: '/lottery',
    component: Layout,
    children: [{
        path: '/',
        name: 'lotteryindex',
        redirect: '/lottery/index'
      },
      {
        path: 'index',
        component: lottery,
        name: 'lottery'
      }
    ]
  },
  // 电竞专题页
  {
    path: '/esports',
    component: Layout,
    children: [{
        path: '/',
        name: 'esportsindex',
        redirect: '/esports/index'
      },
      {
        path: 'index',
        component: esports,
        name: 'esports'
      }
    ]
  },
  // 棋牌专题页
  {
    path: '/chess',
    component: Layout,
    children: [{
        path: '/',
        name: 'chessindex',
        redirect: '/chess/index'
      },
      {
        path: 'index',
        component: chess,
        name: 'chess'
      }
    ]
  },
  // 棋牌游戏大厅
  {
    path: '/chessHall',
    component: Layout,
    children: [{
        path: '/',
        name: 'chessHallindex',
        redirect: '/chessHall/index'
      },
      {
        path: 'index/:type?',
        component: chessHall,
        name: 'chessHall'
      }
    ]
  },
  // 下载教程页
  {
    path: '/downloadTch',
    component: Layout,
    children: [{
        path: '/',
        name: 'downloadTchindex',
        redirect: '/real/index'
      },
      {
        path: 'index',
        component: downloadTch,
        name: 'downloadTch'
      }
    ]
  },
  // 线路选择
  {
    path: '/domains',
    component: domains,
    name: 'domains'
  },
]
