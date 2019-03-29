/**
 * 说明，show文档里的都是展示有关的页面，功能页面不要放这里，例如个人中心
 * / * webpackChunkName: "commonh5deposit" * /  是chunk打包后的文件名
 */
// import Layout from 'mobile/master/t1/show' // 基础外框

// 游戏大厅
const slotgame = () =>
  import(/* webpackChunkName: "showh5slotgame" */ 'mobile/views/show/slotgame/index')
// 代理加盟页面
const cooperation = () =>
  import(/* webpackChunkName: "showh5cooperation" */ 'mobile/views/show/cooperation/index')
// 代理/用户登录页面
const login_index = () =>
  import(/* webpackChunkName: "showh5login" */ 'mobile/views/show/login')
// 用户注册页面
const login_register = () =>
  import(/* webpackChunkName: "showh5register" */ 'mobile/views/show/register-user')
// 代理注册页面
const agent_register = () =>
  import(/* webpackChunkName: "showh5agentRegister" */ 'mobile/views/show/register-agent')
const chessHall = () => import(/* webpackChunkName: "showh5chessHall" */'mobile/views/extend/chessHall')// 棋牌大厅

export default [
  // 配置根路径重定向
  {
    path: '',
    redirect: '/slotgame'
  },
  // 配置index重定向
  {
    path: '/index',
    redirect: '/slotgame'
  },
  // 配置index重定向
  {
    path: '/',
    redirect: '/slotgame'
  },
  // 游戏大厅
  {
    path: '/slotgame/:type?',
    component: slotgame,
      name: 'slotgame',
      meta: {
      noCache: true, // 是否不缓存改组件,
    }
  },
  // 用户/代理登录页面
  {
    path: '/login',

      path: 'index',
      component: login_index,
      name: 'login',
      meta: {
        title: '用户登录'
      }
  },  
  // 用户注册
  // {
  //   path: '/register',

  //     path: 'index',
  //     component: login_register,
  //     name: 'register',
  //     meta: {
  //       title: '用户注册'
  //     }
  // },
  // 代理注册
  // {
  //   path: '/registeragent',
  //     path: 'index',
  //     component: agent_register,
  //     name: 'agentregister',
  //     meta: {
  //       title: '代理注册'
  //     }
  // },
  // 代理加盟介绍
  {
    path: '/cooperation',
    component: {template:'<router-view></router-view>'},
    children: [{
      path: '/',
      name: 'cindex',
      redirect: '/cooperation/index'
    },
    {
      path: 'index',
      component: cooperation,
      name: 'cooperation',
      meta: {
        title: '代理加盟'
      }
    }
    ]
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
]
