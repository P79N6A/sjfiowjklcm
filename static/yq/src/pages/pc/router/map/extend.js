/**
 * 说明，这里可以放业务扩展的页面
 */
import Layout from "pc/master/main";
// 以下页面为专题页，可有可无，看需求
// 捕鱼入口
const fish = () =>
  import( /* webpackChunkName: "fish" */ "pc/views/extend/fish");
// 真人入口页
const real = () =>
  import( /* webpackChunkName: "real" */ "pc/views/extend/real");
// 体育入口页
const sport = () =>
  import( /* webpackChunkName: "sport" */ "pc/views/extend/sport");
// 彩票专题页
const lottery = () =>
  import( /* webpackChunkName: "lottery" */ "pc/views/extend/lottery");
// 电竞专题页
const esports = () =>
  import( /* webpackChunkName: "esports" */ "pc/views/extend/esport");
// 棋牌专题页
const chess = () =>
  import( /* webpackChunkName: "chess" */ "pc/views/extend/chess");
// 棋牌专题页
const chessHall = () =>
  import( /* webpackChunkName: "chessHall" */ "pc/views/extend/chessHall");

// 专题页
const girls = () =>
  import( /* webpackChunkName: "girls" */ "pc/views/extend/girls");
// 下载教程页
const downloadTch = () =>
  import( /* webpackChunkName: "downloadTch" */ "pc/views/extend/downloadTch");
// 注册页面
const registerPage = () =>
  import( /* webpackChunkName: "registerPage" */ "pc/views/extend/registerPage");
// 注册页面
const loginPage = () =>
  import( /* webpackChunkName: "loginPage" */ "pc/views/extend/loginPage");
// 真人体育
const realSport = () =>
  import( /* webpackChunkName: "realSport" */ "pc/views/extend/realSport");
// 娱乐城
const ylc = () => import( /* webpackChunkName: "ylc" */ "pc/views/extend/ylc");
// 线路选择
const domains = () =>
  import( /* webpackChunkName: "domains" */ "pc/views/extend/domains");
// 账号问题
const accountQA = () =>
  import( /* webpackChunkName: "accountQA" */ "pc/views/extend/accountQA");
// 奇幻城风采
const history = () =>
  import( /* webpackChunkName: "accountQA" */ "pc/views/extend/history");
// 注册成功
const registerSucces = () =>
  import( /* webpackChunkName: "registerSucces" */ "pc/views/extend/registerSucces");
// 防劫持
const hijacking = () =>
  import( /* webpackChunkName: "hijacking" */ "pc/views/extend/hijacking");
// 新手指南
const newGuide = () =>
  import( /* webpackChunkName: "hijacking" */ "pc/views/extend/newGuide");
export default [
  // 捕鱼专题页
  {
    path: "/fish",
    component: Layout,
    children: [{
        path: "/",
        name: "fishindex",
        redirect: "/fish/index"
      },
      {
        path: "index",
        component: fish,
        name: "fish"
      }
    ]
  },
  // 真人专题页
  {
    path: "/real",
    component: Layout,
    children: [{
        path: "/",
        name: "realindex",
        redirect: "/real/index"
      },
      {
        path: "index",
        component: real,
        name: "real"
      }
    ]
  },
  // 体育专题页
  {
    path: "/sport",
    component: Layout,
    children: [{
        path: "/",
        name: "sportindex",
        redirect: "/sport/index",
        noCache: true
      },
      {
        path: "index",
        component: sport,
        name: "sport",
        noCache: true
      }
    ]
  },
  // 彩票专题页
  {
    path: "/lottery",
    component: Layout,
    children: [{
        path: "/",
        name: "lotteryindex",
        redirect: "/lottery/index"
      },
      {
        path: "index",
        component: lottery,
        name: "lottery"
      }
    ]
  },
  // 棋牌专题页
  {
    path: "/chess",
    component: Layout,
    children: [{
        path: "/",
        name: "chessindex",
        redirect: "/chess/index"
      },
      {
        path: "index",
        component: chess,
        name: "chess"
      }
    ]
  },
  // 棋牌游戏大厅
  {
    path: "/chessHall",
    component: Layout,
    children: [{
        path: "/",
        name: "chessHallindex",
        redirect: "/chessHall/index"
      },
      {
        path: "index/:type?",
        component: chessHall,
        name: "chessHall"
      }
    ]
  },
  // 电竞专题页
  {
    path: "/esports",
    component: Layout,
    children: [{
        path: "/",
        name: "esportsindex",
        redirect: "/esports/index"
      },
      {
        path: "index",
        component: esports,
        name: "esports"
      }
    ]
  },
  // 下载教程页
  {
    path: "/downloadTch",
    component: Layout,
    children: [{
        path: "/",
        name: "downloadTchindex",
        redirect: "/downloadTch/index"
      },
      {
        path: "index",
        component: downloadTch,
        name: "downloadTch"
      }
    ]
  },
  // 注册页面
  {
    path: "/registerPage",
    component: Layout,
    children: [{
        path: "/",
        name: "registerPageindex",
        redirect: "/registerPage/index"
      },
      {
        path: "index",
        component: registerPage,
        name: "registerPage"
      }
    ]
  },
  // 登陆页面
  {
    path: "/loginPage",
    component: Layout,
    children: [{
        path: "/",
        name: "loginPageindex",
        redirect: "/loginPage/index"
      },
      {
        path: "index",
        component: loginPage,
        name: "loginPage"
      }
    ]
  },

  // 真人体育
  {
    path: "/realSport",
    component: Layout,
    children: [{
        path: "/",
        name: "realSportindex",
        redirect: "/realSport/index"
      },
      {
        path: "index",
        component: realSport,
        name: "realSport"
      }
    ]
  },
  // 娱乐城
  {
    path: "/ylc",
    component: Layout,
    children: [{
        path: "/",
        name: "ylcindex",
        redirect: "/ylc/index"
      },
      {
        path: "index",
        component: ylc,
        name: "ylc"
      }
    ]
  },
  // 线路选择
  {
    path: "/domains",
    component: domains,
    name: "domains"
  },
  // 账号问题
  {
    path: "/accountQA",
    component: Layout,
    children: [{
        path: "/",
        name: "accountQAindex",
        redirect: "/accountQA/index"
      },
      {
        path: "index",
        component: accountQA,
        name: "accountQA"
      }
    ]
  },
  // 女郎
  {
    path: "/girls",
    component: {
      template: "<router-view></router-view>"
    },
    children: [{
        path: "/",
        name: "girls",
        redirect: "/girls/index"
      },
      {
        path: "index",
        component: girls,
        name: "girlsIndex"
      }
    ]
  },
  // 奇幻城风采
  {
    path: "/history",
    component: Layout,
    children: [{
        path: "/",
        name: "history",
        redirect: "/history/index"
      },
      {
        path: "index",
        component: history,
        name: "historyIndex"
      }
    ]
  },
  // 注册成功
  {
    path: "/registerSucces",
    component: Layout,
    children: [{
        path: "/",
        name: "registerSucces",
        redirect: "/registerSucces/index"
      },
      {
        path: "index",
        component: registerSucces,
        name: "registerSuccesIndex"
      }
    ]
  },
  // 防劫持
  {
    path: "/hijacking",
    component: Layout,
    children: [{
        path: "/",
        name: "hijacking",
        redirect: "/hijacking/index"
      },
      {
        path: "index",
        component: hijacking,
        name: "hijackingIndex"
      }
    ]
  },
  // 新手指南
  {
    path: "/newGuide",
    // component: Layout,
    redirect: '/home/index',
    children: [{
        path: "/",
        name: "newGuide",
        redirect: "/home/index"
      },
      {
        path: "index",
        // component: newGuide,
        name: "newGuideIndex",
        redirect: "/home/index"

      }
    ]
  }
];
