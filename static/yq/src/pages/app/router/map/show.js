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
// 喜爱夜蒲
const girls = () => 
  import( /* webpackChunkName: "showh5girls" */ 'mobile/views/extend/girls/index') 
// 服务中心
const serviceList = () => 
  import( /* webpackChunkName: "showh5girls" */ 'mobile/views/extend/serviceList/index') 
// 意见反馈
const service = () => 
  import( /* webpackChunkName: "showh5girls" */ 'mobile/views/extend/service') 
// 反馈记录
const serviceLog = () => 
  import( /* webpackChunkName: "showh5girls" */ 'mobile/views/extend/serviceLog') 
// 专属福利
const welfare = () =>
  import( /* webpackChunkName: "showh5welfare" */ 'mobile/views/extend/welfare') 
// 防劫持hijacking
const hijacking = () =>
  import( /* webpackChunkName: "showh5hijacking" */ 'mobile/views/extend/hijacking') 
// 尊享VIP
const vip = () =>
  import( /* webpackChunkName: "showh5vip" */ 'mobile/views/show/vip') 


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
  {
    path: '/girls',
    component: girls,
    name: 'girls',
    meta: {
      noCache: true, // 是否不缓存改组件,
      title: '喜爱夜蒲',
      isAPP:true
    }
  }, 
  {
    path: '/serviceList',
    component: serviceList,
    name: 'serviceList',
    meta: {
      title: '服务中心',
      isAPP:true
    }
  }, 
  {
    path: '/service',
    component: service,
    name: 'service',
    meta: {
      title: '意见反馈',
      isAPP:true
    }
  }, 
  {
    path: '/serviceLog',
    component: serviceLog,
    name: 'serviceLog',
    meta: {
      title: '反馈记录',
      isAPP:true
    }
  },
  {
    path: '/welfare',
    component: welfare,
    name: 'welfare',
    meta: {
      title: '专属福利',
      isAPP:true
    }
  },
  {
    path: '/hijacking',
    component: hijacking,
    name: 'hijacking',
    meta: {
      title: '防劫持帮助',
      isAPP:true
    }
  },
  {
    path: '/vip',
    component: vip,
    name: 'vip',
    meta: {
      title: 'VIP会所',
      isAPP:true
    }
  },
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
  // 代理注册
  {
    path: '/registerAgent',
    component: {template:'<router-view></router-view>'},
    children: [{
      path: '/',
      name: 'rAindex',
      redirect: '/registerAgent/index'
    },
    {
      path: 'index',
      component: agent_register,
      name: 'registerAgent',
      meta: {
        title: '加盟注册'
      }
    }
    ]
  },
]
