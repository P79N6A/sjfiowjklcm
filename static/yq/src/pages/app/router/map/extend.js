// const index = () => import(/* webpackChunkName: "showh5index" */'mobile/views/show/index')// 首页
const history = () =>
  import(/* webpackChunkName: "showh5welfare" */ "mobile/views/extend/history"); // 奇幻城风采
const chessHall = () => import(/* webpackChunkName: "showh5chessHall" */'mobile/views/extend/chessHall')// 棋牌大厅
export default [
  //奇幻城风采
  {
    path: "/history",
    component: history,
    name: "history",
    meta: {
      title: "奇幻城风采"
    }
  },
  // 棋牌游戏大厅
  {
    path: '/chessHall/:type?',
    component: chessHall,
    name: 'chessHall',
    meta: {
      noCache: true, // 是否不缓存改组件,
      title: '棋牌游戏'
    }
    
  
  },
];
