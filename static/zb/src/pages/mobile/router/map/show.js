/**
 * 说明，show文档里的都是展示有关的页面，功能页面不要放这里，例如个人中心
 * / * webpackChunkName: "commonh5deposit" * /  是chunk打包后的文件名
 */
import Layout from 'mobile/master/t1/show' // 基础外框
import Layout2 from 'mobile/master/t1/page-in' // 带返回操作的外框
import Layout3 from 'mobile/master/t1/page-foot'  //去掉顶部的 留有底部
import Layout4 from 'mobile/master/t1/page-nothing'  //去掉头部和底部

// 首页
const index = () =>
  import(/* webpackChunkName: "showh5index" */ 'mobile/views/show/index')
// 游戏大厅
const slotgame = () =>
  import(/* webpackChunkName: "showh5slot" */ 'mobile/views/show/slotgame/index')
// 优惠大厅
const promo = () =>
  import(/* webpackChunkName: "showh5pros" */ 'mobile/views/show/promo')
// 公告页面
const notice = () =>
  import(/* webpackChunkName: "showh5notice" */ 'mobile/views/show/notice')
// 代理加盟页面
const cooperation = () =>
  import(/* webpackChunkName: "agent" */ 'mobile/views/show/cooperation/index')

// 代理/用户登录页面
const login_index = () =>
  import(/* webpackChunkName: "showh5login" */ 'mobile/views/show/login')
// 用户注册页面
const login_register = () =>
  import(/* webpackChunkName: "showh5register" */ 'mobile/views/show/register-user')
// 代理注册页面
const agent_register = () =>
  import(/* webpackChunkName: "show" */ 'mobile/views/show/register-agent')
// 客服中心
const serviceCenter = () =>
  import(/* webpackChunkName: "serviceCenter" */ 'mobile/views/show/serviceCenter')
//资金问题
const financial_problems = () =>
  import(/* webpackChunkName: "serviceCenter" */ 'mobile/views/show/serviceCenter/components/financial-problems')
const account_problems = () =>
  import(/* webpackChunkName: "serviceCenter" */ 'mobile/views/show/serviceCenter/components/account-problems')
const discount_problems = () =>
  import(/* webpackChunkName: "serviceCenter" */ 'mobile/views/show/serviceCenter/components/discount-problems')
const game_problems = () =>
  import(/* webpackChunkName: "serviceCenter" */ 'mobile/views/show/serviceCenter/components/game-problems')
const aboutUs = () =>
  import(/* webpackChunkName: "serviceCenter" */ 'mobile/views/show/serviceCenter/components/aboutUs')
const other_problems = () =>
  import(/* webpackChunkName: "serviceCenter" */ 'mobile/views/show/serviceCenter/components/other-problems')
export default [
  // 配置根路径重定向
  {
    path: '/',
    redirect: '/home/index'
  },
  // 配置index重定向
  {
    path: '/index',
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
        noCache: true, // 是否不缓存改组件,
      },
    }
    ]
  },
  // 游戏大厅
  {
    path: '/slotgame',
    component: Layout,
    children: [{
      path: '/',
      name: 'gindex',
      redirect: '/slotgame/index'
    },
    {
      path: 'index/:type?/:flag?',
      component: slotgame,
      name: 'slotgame',
      meta: {
        noCache: true, // 是否不缓存改组件,
        title: '游戏大厅'
      },
    }
    ]
  },
  // 优惠大厅
  {
    path: '/promo',
    component: Layout,
    children: [{
      path: '/',
      name: 'pindex',
      redirect: '/promo/index'
    },
    {
      path: 'index',
      component: promo,
      name: 'promo',
    }
    ]
  },  
  // 公告大厅
  {
    path: '/notice',
    component: Layout,
    children: [{
      path: '/',
      name: 'nindex',
      redirect: '/notice/index'
    },
    {
      path: 'index',
      component: notice,
      name: 'notice',
    }
    ]
  },
  // 用户/代理登录页面
  {
    path: '/login',
    component: Layout4,
    children: [{
      path: '/',
      name: 'lindex',
      redirect: '/login/index'
    },
    {
      path: 'index',
      component: login_index,
      name: 'login',
      meta: {
        title: '会员登录'
      }
    }
    ]
  },  
  // 用户注册
  {
    path: '/register',
    component: Layout2,
    children: [{
      path: '/',
      name: 'rindex',
      redirect: '/register/index'
    },
    {
      path: 'index',
      component: login_register,
      name: 'register',
      meta: {
        title: '会员注册'
      }
    }
    ]
  },
  // 代理頁面
  {
    path: '/cooperation',
    component: Layout,
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
        noCache: true, // 是否不缓存改组件,
        title: '代理加盟'
      }
    }
    ]
  },
  //客服中心
  {
    path: '/serviceCenter',
    component: Layout2,
    children:[
      {
        path: '/',
        name: 'SCindex',
        redirect: '/serviceCenter/index'
      },
      {
        path: 'index',
        component: serviceCenter,
        name: 'serviceCenter',
        meta: {
          title: '客服中心'
        }
      },
      {
        path: 'financial_problems/:id?',
        component: financial_problems,
        name: 'financial_problems',
        meta: {
          title: '资金问题'
        }
      },
      {
        path: 'account_problems/:id?',
        component: account_problems,
        name: 'account_problems',
        meta: {
          title: '账号问题'
        }
      },
      {
        path: 'discount_problems/:id?',
        component: discount_problems,
        name: 'discount_problems',
        meta: {
          title: '优惠问题'
        }
      },
      {
        path: 'game_problems/:id?',
        component: game_problems,
        name: 'game_problems',
        meta: {
          title: '游戏问题'
        }
      },
      {
        path: 'aboutUs',
        component: aboutUs,
        name: 'aboutUs',
        meta: {
          title: '关于我们'
        }
      },
      {
        path: 'other_problems',
        component: other_problems,
        name: 'other_problems',
        meta: {
          title: '其他问题'
        }
      }
    ]
  }
]
